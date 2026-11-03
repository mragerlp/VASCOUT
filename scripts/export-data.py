#!/usr/bin/env python3
"""Export only literal data from the archived UI; never execute its JavaScript."""
import ast
import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = {
    "origin_app_id": "7554d8e4-adad-42d3-a2c8-a4e77af46795",
    "origin_revision": 10,
    "origin_url": "https://charm.ing/bloodwave/vascout",
    "content_snapshot_date": "2026-10-20",
    "exported_at": "2026-11-03",
}

class LiteralReader:
    """Parser for object/array/string/number/boolean/null literals, not code."""
    token = re.compile(r'''\s*(?:(?P<string>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?P<number>-?\d+(?:\.\d+)?)|(?P<word>[A-Za-z_$][\w$-]*)|(?P<punct>[{}\[\]:,]))''', re.S)
    def __init__(self, text):
        self.text, self.pos = text, 0
    def next(self):
        match = self.token.match(self.text, self.pos)
        if not match:
            raise ValueError(f"Non-literal token at offset {self.pos}")
        self.pos = match.end()
        return match.lastgroup, match.group(match.lastgroup)
    def value(self, first=None):
        kind, value = first or self.next()
        if kind == "string": return ast.literal_eval(value)
        if kind == "number": return float(value) if "." in value else int(value)
        if kind == "word" and value in {"true", "false", "null"}:
            return {"true": True, "false": False, "null": None}[value]
        if value == "{":
            result = {}
            token = self.next()
            while token[1] != "}":
                key = ast.literal_eval(token[1]) if token[0] == "string" else token[1]
                if self.next()[1] != ":": raise ValueError("Expected colon")
                if key in result: raise ValueError(f"Duplicate key {key}")
                result[key] = self.value()
                token = self.next()
                if token[1] == "}": break
                if token[1] != ",": raise ValueError("Expected comma")
                token = self.next()
            return result
        if value == "[":
            result = []
            token = self.next()
            while token[1] != "]":
                result.append(self.value(token))
                token = self.next()
                if token[1] == "]": break
                if token[1] != ",": raise ValueError("Expected comma")
                token = self.next()
            return result
        raise ValueError(f"Not a supported literal: {kind} {value}")

def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        handle.write(json.dumps(value, ensure_ascii=False, indent=2) + "\n")

def export_table(name, rows):
    directory = ROOT / "data" / "normalized"
    write_json(directory / f"{name}.json", rows)
    fields = list(dict.fromkeys(key for row in rows for key in row))
    with (directory / f"{name}.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({key: json.dumps(value, ensure_ascii=False) if isinstance(value, (list, dict)) else value for key, value in row.items()})

def main():
    ui = (ROOT / "src/charming/ui.js").read_text(encoding='utf-8')
    content = LiteralReader(ui.split("globalThis.VascoutContent =", 1)[1]).value()
    partners = LiteralReader(ui.split("globalThis.VascoutPartners =", 1)[1]).value()
    write_json(ROOT / "data/raw/content.json", content)
    write_json(ROOT / "data/raw/partners.json", partners)
    tables = {}
    def record(kind, original, **extra):
        return {"record_id": f"vascout:{kind}:{original['id']}", **original, **extra, **ORIGIN}
    tables["sources"] = [record("source", row, scope="evidence", original_status=row["status"], status_semantics="Bounded finding reported by the cited source; not VASCOUT validation") for row in content["sources"]]
    tables["sources"] += [record("source", row, scope="partner", original_status="NOT_ASSIGNED", status_semantics="Organization capability or engagement-route reference; no partner commitment") for row in partners["sources"]]
    tables["claim_audits"] = [record("claim-audit", row, original_claim=row["claim"], audit_finding=row["finding"], audit_status=row["status"], status_applies_to="audit_finding", source_record_id=f"vascout:source:{row['source']}") for row in content["claims"]]
    tables["requirements"] = [record("requirement", row, record_kind="DESIGN_TARGET", measured_performance=False) for row in content["requirements"]]
    tables["components"] = [record("component", row, record_kind="CONCEPT_COMPONENT") for row in content["components"]]
    tables["research_questions"] = [record("question", row, validation_status="UNVERIFIED", review_status="OPEN") for row in content["questions"]]
    tables["partner_prospects"] = [record("partner", row, engagement_status="PROSPECT_UNCONFIRMED", pitch_status="DRAFT_NOT_SENT", fit_status="INFERENCE", study_status="PROPOSED") for row in partners["partners"]]
    relationships = []
    for row in content["claims"]:
        relationships.append({"relationship_id":f"claim-source:{row['id']}:{row['source']}","from_record_id":f"vascout:claim-audit:{row['id']}","to_record_id":f"vascout:source:{row['source']}","relationship_type":"CITES_SOURCE","relationship_basis":"EXPLICIT_SOURCE_FIELD",**ORIGIN})
    for row in partners["partners"]:
        for source_id in row["sourceIds"]:
            relationships.append({"relationship_id":f"partner-source:{row['id']}:{source_id}","from_record_id":f"vascout:partner:{row['id']}","to_record_id":f"vascout:source:{source_id}","relationship_type":"CITES_SOURCE","relationship_basis":"EXPLICIT_SOURCE_FIELD",**ORIGIN})
    tables["relationships"] = relationships
    for name, rows in tables.items(): export_table(name, rows)
    envelope = []
    for name, rows in tables.items():
        for row in rows:
            envelope.append({"record_id":row.get("record_id", row.get("relationship_id")), "collection":name, "payload_json":json.dumps(row, ensure_ascii=False, separators=(",", ":"))})
    write_json(ROOT / "data/foundry/research_snapshot.json", envelope)
    with (ROOT / "data/foundry/research_snapshot.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["record_id", "collection", "payload_json"], lineterminator="\n")
        writer.writeheader()
        writer.writerows(envelope)
    counts = {name:len(rows) for name, rows in tables.items()}
    source_hashes = {
        path.relative_to(ROOT).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
        for path in sorted((ROOT / "src/charming").glob("*"))
    }
    write_json(ROOT / "data/provenance.json", {**ORIGIN,"static_record_count":sum(counts.values())-len(relationships),"table_counts":counts,"canonical_envelope_row_count":len(envelope),"canonical_envelope_columns":["record_id", "collection", "payload_json"],"source_read_is_independent_publication_verification":False,"clinical_validation_status":"UNVERIFIED","partner_engagement_status":"UNCONFIRMED","dynamic_review_notes":"Excluded from repository export; not part of the static 66-record corpus","source_hashes":source_hashes})
    print(json.dumps(counts))

if __name__ == "__main__": main()
