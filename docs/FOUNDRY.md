# Foundry data package

At handoff, the VASCOUT project in Cavelux Foundry had a verified canonical snapshot and seven verified flattened datasets. Ontology integration remained in progress. No live synchronization connection is configured.

## Foundry resources

- [VASCOUT project](https://cavelux.usw-22.palantirfoundry.com/workspace/compass/view/ri.compass.main.folder.3447c592-cfe5-408a-b072-da9a2c3406f5)
- [VASCOUT Pilot application repository](https://cavelux.usw-22.palantirfoundry.com/workspace/pilot-app/repository/ri.stemma.main.repository.2e905561-ca97-4093-92e1-af7539b23eba)
- [Canonical research snapshot pipeline](https://cavelux.usw-22.palantirfoundry.com/workspace/builder/ri.eddie.main.pipeline.93651d29-0e01-4a92-ba64-93b72c17f433)
- [Canonical research snapshot output dataset](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.70f6b3c5-af3f-4faa-8e00-473d27c20b83/master)
- [Ontology integration pipeline](https://cavelux.usw-22.palantirfoundry.com/workspace/builder/ri.eddie.main.pipeline.1ce7fc73-a4dd-4dfb-8378-91997cf55a81)
- [Native ontology integration work session](https://cavelux.usw-22.palantirfoundry.com/workspace/ai-fde/session/5a83dcf5-8026-4810-b825-339aefa9aea1)

At the 3 November 2026 export, the Pilot frontend build was still in progress. Its deployed behavior and ontology-backed storage had not yet been verified. Canonical dataset verification is recorded separately below; it does not establish that the application is complete.

## Canonical snapshot envelope

The source pipeline was created in Foundry, deployed successfully with **0 errors**, and its persisted output verified at **86 rows and 3 columns**, covering 66 entities and 20 explicit relationships.

`data/foundry/research_snapshot.csv` and `.json` reproduce the same three-column envelope. Row ordering is immaterial; stable keys and parsed payload values define equality.

| Column | Type | Meaning |
| --- | --- | --- |
| `record_id` | string | Entity `record_id`, or `relationship_id` for citation rows |
| `collection` | string | One of the seven normalized table names below |
| `payload_json` | string | Lossless JSON serialization of the complete normalized row, including provenance |

Use `schemas/foundry_snapshot.schema.json` for the envelope contract. Parse `payload_json` and select `collection` to derive the individual entity and relationship datasets. The seven flattened tables remain available below for direct imports and review. Canonical-envelope rows are another representation of the same data, not 86 additional research findings.

## Persisted output verification

Native Foundry SQL checked row counts, unique IDs, and the sum of JSON payload character lengths by collection. All matched the repository's exact minified normalized objects. The query completed in 697 ms. This verifies the imported snapshot's persistence and collection totals; it does not independently verify medical evidence or prove application behavior.

| Collection | Rows | Unique IDs | Payload characters |
| --- | ---: | ---: | ---: |
| `claim_audits` | 6 | 6 | 4,782 |
| `components` | 5 | 5 | 3,509 |
| `partner_prospects` | 8 | 8 | 18,930 |
| `relationships` | 20 | 20 | 7,950 |
| `requirements` | 11 | 11 | 5,306 |
| `research_questions` | 6 | 6 | 3,799 |
| `sources` | 30 | 30 | 24,435 |

Machine-readable evidence is in `data/foundry/deployment-verification.json`. The source pipeline's successful deployment and the persisted dataset's SQL checks were observed on 3 November 2026.

## Ontology work branch

The `vascout-research-r10` work branch contains **8 new VASCOUT object types, 2 action types, and 6 links**. These changes have **not been merged into Main**.

| Resource | Identifier | Snapshot state |
| --- | --- | --- |
| Foundry work branch | `ri.branch..branch.5415010a-348e-4b4e-9338-102f4b6cb765` | Created; unmerged |
| Ontology work branch | `ri.ontology.main.branch.70aeb588-50bd-44fd-8473-645f42d35070` | 8 object types, 2 actions, 6 links; unmerged |
| Ontology integration pipeline | `ri.eddie.main.pipeline.1ce7fc73-a4dd-4dfb-8378-91997cf55a81` | Hydration deployment succeeded; datasource mapping correction and indexing verification pending |

The ontology integration pipeline is separate from the verified canonical snapshot pipeline. An earlier `DuplicatePropertyTypeMappings` issue required datasource-mapping corrections; final mappings, actions, and indexing remain unfinished or unverified. A pipeline deployment does not prove indexed object availability, action behavior, or Main-branch integration. The Pilot frontend is also a separate build and remains in progress at this snapshot.

The native integration work also created a code repository named `vascout-ontology-datasets`, with commit `84481d39d8c`. Its preview succeeded for one source row, and CI succeeded at 4:16 PM America/New_York on 3 November 2026 after 2 minutes 5 seconds. A backing-dataset build started at 4:19 PM; the last observation showed two jobs succeeded after 47 seconds while the overall build was still running. Full backing-dataset publication and hydration were not verified. The verified canonical and flattened snapshots above remain the established data outputs.

The Pilot preview still showed “Nothing here yet” at handoff. Frontend rendering and release remained unverified. See [handoff and remaining work](HANDOFF.md) for the resume points.

## Dataset mapping

Seven flattened outputs have been deployed successfully from the canonical snapshot pipeline, with **0 errors**. All seven persisted datasets were verified together using native `UNION ALL` SQL, which completed in **1,158 ms**. Each collection's row count, unique-ID count, and total payload JSON character count exactly matched the canonical verification table above. The original verified 86-row raw snapshot remains unchanged.

The repository also provides each flattened table as a UTF-8 CSV for reproducible import. Preserve strings and identifiers exactly; use explicit booleans for `measured_performance`, integer for `origin_revision`, and dates for snapshot/export dates when desired. An empty source URL means no supplied public URL. Object labels below describe the entity mapping; the work branch includes additional workflow types beyond these six entities.

| File | Deployed output dataset | Expected rows | Entity mapping |
| --- | --- | ---: | --- |
| `sources.csv` | [vascout_sources](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.edf949cd-37f3-4dd3-a3bf-048f507aa62f/master) | 30 | VASCOUT Source |
| `claim_audits.csv` | [vascout_claim_audits](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.fe439963-5084-4109-a9b2-c0e4c4016377/master) | 6 | VASCOUT Claim Audit |
| `requirements.csv` | [vascout_requirements](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.f103e8ea-aa04-49a9-9bbf-2962b3907e40/master) | 11 | VASCOUT Requirement |
| `components.csv` | [vascout_components](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.4d4f24f8-a947-4941-82e0-cb0617a50a88/master) | 5 | VASCOUT Component |
| `research_questions.csv` | [vascout_research_questions](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.9f04b70b-5595-44fb-ba9a-1653e859ab9a/master) | 6 | VASCOUT Research Question |
| `partner_prospects.csv` | [vascout_partner_prospects](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.cd44759a-eb32-4690-ad84-de3fc914d18a/master) | 8 | VASCOUT Partner Prospect |
| `relationships.csv` | [vascout_relationships](https://cavelux.usw-22.palantirfoundry.com/workspace/dataset/preview/ri.foundry.main.dataset.ac18f6e2-75d6-4080-b8f0-692f0f226929/master) | 20 | Citation join data |

Use `record_id` as the entity primary key. Source and partner titles/names are display titles, while claim audit titles should describe the audit finding or identify it as an audit. Do not title an original proposition “confirmed.”

## Explicit links

- Claim Audit → Source: join `source_record_id` to `sources.record_id` (6 links).
- Partner Prospect → Source: use relationship rows whose `from_record_id` starts with `vascout:partner:` (14 links).
- Do not infer relationships between hardware, specifications, and evidence from proximity in the dossier.

## Data-rich view

Recommended sections: research overview; evidence library with scope/modality/setting filters; claim-audit split view; proposed requirements; component details; open validation gates; partner prospect details with cited organization sources and unsent pitch drafts. Always show the source boundary beside its finding.

Suggested overview metrics are **record counts**, not clinical success rates: 30 references, 6 audit findings, 11 targets, 5 concept components, 6 open research questions, and 8 unconfirmed partner prospects. No clinical-outcome charts, fake telemetry, or progress percentages are present in this package.

## Review workflow contract

If adding a Foundry writeback action, keep a separate review log containing stable review ID, question/claim ID, note, timestamp, and authenticated reviewer when actually supplied by the platform. Discussion review and clinical validation must be separate states. Do not populate reviewer identity from this export: the original app did not record one. Preserve historical notes rather than overwriting provenance.

## Acceptance checks

1. Entity totals equal 66; citation links equal 20; primary keys are unique.
2. Every link resolves, including S10a/S10b and the partner P01–P14 references.
3. `original_claim` and `audit_finding` remain separate; the status applies to the finding.
4. Proposed requirements remain targets; partner engagement remains unconfirmed; pitches remain unsent.
5. Source URLs and access limitations are visible. Synthetic models and all research boundaries remain clear.
6. Review-note imports do not mark any validation gate complete merely because app persistence was tested.

Re-run `python scripts/validate-data.py` before each import. Record the git commit and `data/provenance.json` with the Foundry import so later changes can be reconciled. This is a point-in-time package; no live synchronization or external submission is configured.

## GitHub publication

See the [project handoff](HANDOFF.md) for GitHub publication status.
