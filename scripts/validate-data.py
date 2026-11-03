#!/usr/bin/env python3
"""Check referential integrity, snapshot fidelity, CSV parity and asset hashes."""
import csv
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {"sources":30,"claim_audits":6,"requirements":11,"components":5,"research_questions":6,"partner_prospects":8,"relationships":20}

def load(path): return json.loads(path.read_text(encoding='utf-8'))

def schema_type(value):
    if value is None: return 'null'
    if isinstance(value, bool): return 'boolean'
    if isinstance(value, int): return 'integer'
    if isinstance(value, list): return 'array'
    if isinstance(value, dict): return 'object'
    if isinstance(value, str): return 'string'
    raise AssertionError(f'Unexpected data type {type(value)}')

def main():
    tables = {name:load(ROOT / 'data/normalized' / f'{name}.json') for name in EXPECTED}
    all_ids = set()
    for name, rows in tables.items():
        assert len(rows) == EXPECTED[name], (name, len(rows))
        key = 'relationship_id' if name == 'relationships' else 'record_id'
        ids = [row[key] for row in rows]
        assert len(ids) == len(set(ids)), f'Duplicate {name} ID'
        if name != 'relationships':
            assert not (all_ids & set(ids)), f'Cross-table ID collision in {name}'
            all_ids.update(ids)
        assert all(row['origin_revision'] == 10 and row['content_snapshot_date'] == '2026-10-20' for row in rows)
        with (ROOT / 'data/normalized' / f'{name}.csv').open(newline='', encoding='utf-8') as handle:
            csv_rows = list(csv.DictReader(handle))
        assert len(csv_rows) == len(rows), f'CSV row count for {name}'
        for row, csv_row in zip(rows, csv_rows):
            for field, value in row.items():
                expected = json.dumps(value, ensure_ascii=False) if isinstance(value, (dict,list)) else '' if value is None else str(value)
                assert csv_row[field] == expected, (name, row[key], field)
        schema = load(ROOT / 'schemas' / f'{name}.schema.json')
        required = schema['items']['required']
        assert all(all(field in row for field in required) for row in rows), f'Missing schema fields in {name}'
        properties = schema['items']['properties']
        for row in rows:
            assert set(row) <= set(properties), f'Unexpected schema fields in {name}'
            for field, value in row.items():
                allowed = properties[field]['type']
                allowed = allowed if isinstance(allowed, list) else [allowed]
                assert schema_type(value) in allowed, (name, row[key], field, 'type')
                if isinstance(value, list):
                    assert all(schema_type(item) == properties[field]['items']['type'] for item in value), (name, field, 'items')
    assert len(all_ids) == 66
    envelope = load(ROOT / 'data/foundry/research_snapshot.json')
    assert len(envelope) == 86
    assert len({row['record_id'] for row in envelope}) == 86
    with (ROOT / 'data/foundry/research_snapshot.csv').open(newline='', encoding='utf-8') as handle:
        assert list(csv.DictReader(handle)) == envelope
    by_collection = {name:[] for name in tables}
    for row in envelope:
        assert set(row) == {'record_id','collection','payload_json'}
        payload = json.loads(row['payload_json'])
        assert row['record_id'] == payload.get('record_id', payload.get('relationship_id'))
        by_collection[row['collection']].append(payload)
    assert by_collection == tables, 'Canonical Foundry envelope differs from normalized data'
    deployment = load(ROOT / 'data/foundry/deployment-verification.json')
    for collection, metrics in deployment['collections'].items():
        rows = [row for row in envelope if row['collection'] == collection]
        assert len(rows) == metrics['rows']
        assert len({row['record_id'] for row in rows}) == metrics['unique_ids']
        assert sum(len(row['payload_json']) for row in rows) == metrics['payload_characters']
    for row in tables['relationships']:
        assert row['from_record_id'] in all_ids and row['to_record_id'] in all_ids, row
        assert row['relationship_basis'] == 'EXPLICIT_SOURCE_FIELD'
    sources = {row['record_id']:row for row in tables['sources']}
    for row in tables['claim_audits']:
        assert row['source_record_id'] in sources
        assert row['claim'] == row['original_claim'] and row['finding'] == row['audit_finding']
        assert row['status_applies_to'] == 'audit_finding'
    audits = {row['id']:row for row in tables['claim_audits']}
    assert audits['ledx']['audit_status'] == audits['bom']['audit_status'] == 'CONFIRMED'
    assert all(row['measured_performance'] is False for row in tables['requirements'])
    assert all(row['engagement_status'] == 'PROSPECT_UNCONFIRMED' and row['pitch_status'] == 'DRAFT_NOT_SENT' for row in tables['partner_prospects'])
    for row in tables['partner_prospects']:
        assert all(f'vascout:source:{source_id}' in sources for source_id in row['sourceIds'])
    assert all(row['validation_status'] == 'UNVERIFIED' and row['review_status'] == 'OPEN' for row in tables['research_questions'])
    provenance = load(ROOT / 'data/provenance.json')
    for name, digest in provenance['source_hashes'].items():
        assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest() == digest, f'Source drift: {name}'
    manifest = load(ROOT / 'assets/asset-manifest.json')
    assets = manifest.get('assets', [])
    downloaded = 0
    assert len(assets) == 11, 'Expected 11 inventoried assets'
    for asset in assets:
        local_path = asset.get('local_path')
        if local_path:
            path = ROOT / local_path
            content = path.read_bytes()
            assert content.startswith(b'%PDF-'), f'Not a PDF: {local_path}'
            assert len(content) == asset['size_bytes']
            assert hashlib.sha256(content).hexdigest() == asset['sha256']
            downloaded += 1
        else:
            assert asset['role'] == 'historical-main' and asset['retrieval_status'] == 'SUPERSEDED_NOT_INCLUDED', f'Missing current asset: {asset["key"]}'
    assert downloaded == 9, 'Expected current main deck and eight partner decks'
    # The source package contains links, not application access tokens or signed URLs.
    for path in ROOT.rglob('*'):
        if not path.is_file() or '.git' in path.parts or path.suffix == '.pdf': continue
        text = path.read_text(encoding='utf-8')
        assert not re.search(r'https://charm\.ing/[^\s"<>]*[?&]t=', text), f'App token URL in {path}'
        assert not re.search(r'https://[^\s"<>]*[?&](?:sig|signature|X-Amz-Signature)=', text, re.I), f'Signed URL in {path}'
    print(f'PASS: 66 static records, 20 explicit relationships, 7 table pairs + 86-row canonical Foundry envelope, source hashes; {downloaded}/{len(assets)} PDF assets downloaded and hashed.')

if __name__ == '__main__': main()
