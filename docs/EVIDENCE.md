# Evidence interpretation

The repository preserves the source dossier's research snapshot. Exporting it is **not an independent reread or re-verification** of the publications, vendor pages, or intake routes.

## Status semantics

| Field or label | Meaning | Does not establish |
| --- | --- | --- |
| Source `CONFIRMED` | Dossier records a bounded finding from the cited source | VASCOUT safety, effectiveness, or integrated performance |
| Claim `audit_status` | Status of the correction or audit finding | Truth of `original_claim` |
| Requirement `TARGET` | Design choice or experimental input | Measured device capability |
| Partner `INFERENCE` | Qualitative research fit assessment | Partner interest, endorsement, eligibility, or funding |
| Pitch `DRAFT_NOT_SENT` | Draft text preserved for review | Delivery or acceptance |
| Review `reviewed=true` | A discussion record marked reviewed | Clinical validation, approval, or human-study authorization |
| `UNKNOWN` signal state | Invalid or missing input remains unresolved | Safe anatomy or absence of disease/foreign material |

The source claim audit uses the status `CONFIRMED` for the LEDX modality correction and analog-front-end channel-count correction. Keep both original claim and audit finding visible together. Never display the original proposition under a generic “confirmed claim” label.

## Boundaries to preserve

- VASCOUT is a concept, not a validated clinical device. The geometry, animation, tissue, and vessel paths are synthetic.
- Proposed depth, vessel size, frequency, and enclosure values are design targets or experimental inputs. No VASCOUT scan measurements or test results are supplied.
- Evidence from healthy volunteers, phantoms, simulation, cadavers, or another approved device does not transfer automatically to this probe or its proposed use.
- Ultrasound-only comparisons, ground truth, failure criteria, optical/acoustic confounding, contact deformation, pigmentation effects, registration error, exposure, heating, and workflow burden remain research work.
- A negative image cannot exclude all foreign bodies. No autonomous clot diagnosis, rupture verification, needle trajectory, insertion-site selection, or treatment decision is implemented.
- Partner organizations are prospects. Draft pitches have not been sent; the original intake/access caveats remain attached.
- Saved review state is separate from the static source and is excluded from this repository export. No reviewer identity is invented.

## Updating evidence

Retain source IDs, original text, access limitations, snapshot dates, and audit history. A fresh independent review should record who reviewed what, when, against which publication version, and which finding changed. Do not silently overwrite source snapshot provenance or mark a proposed requirement as measured without supporting results.
