# Data dictionary

All entity rows have `record_id` (stable prefixed identifier), the original short `id`, and provenance: `origin_app_id`, `origin_revision`, `origin_url`, `content_snapshot_date`, and `exported_at`. Rows preserve original fields as well as explicit normalized semantics.

| Table | Key | Important fields |
| --- | --- | --- |
| `sources` | `record_id` | `scope`, `title`, `url`, `setting`, `modality`, `supports`, `limits`, `quote`, `original_status`, `status_semantics`; partner references use `access` and `limit` |
| `claim_audits` | `record_id` | `original_claim`, `audit_finding`, `audit_status`, `status_applies_to=audit_finding`, `source_record_id` |
| `requirements` | `record_id` | `item`, `target`, `meaning`, `verify`, `record_kind=DESIGN_TARGET`, `measured_performance=false` |
| `components` | `record_id` | `name`, `purpose`, `interface`, `maturity`, `test`, `record_kind=CONCEPT_COMPONENT` |
| `research_questions` | `record_id` | `title`, `stage`, `prompt`, `gate`, `validation_status=UNVERIFIED`, `review_status=OPEN` |
| `partner_prospects` | `record_id` | `name`, `category`, `role`, `sequence`, `sourceIds`, `fact`, `fit`, `study`, `deliverable`, `gap`, `route`, `routeUrl`, `subject`, `pitch`, explicit unconfirmed/draft status fields |
| `relationships` | `relationship_id` | `from_record_id`, `to_record_id`, `relationship_type=CITES_SOURCE`, `relationship_basis=EXPLICIT_SOURCE_FIELD` |

`sources` is a union: evidence rows and partner-reference rows have different original fields. Missing CSV values mean “not supplied”; do not invent values to fill them. JSON preserves `null` in the concept-material source URL. Arrays such as partner `sourceIds` are encoded as JSON text inside CSV cells; relationship rows provide a simpler joinable representation.

## Stable identifiers

Examples: `vascout:source:S01`, `vascout:claim-audit:ledx`, `vascout:requirement:depth`, `vascout:component:sensor`, `vascout:question:imaging`, `vascout:partner:verasonics`.

The citation relationships come directly from original `claims[].source` and `partners[].sourceIds`. No component-to-requirement or question-to-source links were inferred. Future curated relationships should carry a distinct basis, such as `CURATED_INFERENCE`, and a review record.

## Separate review-note export

Saved application review notes are excluded from this repository export. They are not part of the 66 static records. A future authorized review migration must keep discussion records separate from evidence and completed validation gates.
