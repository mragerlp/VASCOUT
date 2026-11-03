# VASCOUT

VASCOUT is a vascular-imaging **research concept**: an ultrasound-led probe with an experimental photoacoustic channel, a passive contact interface, and explicit image-quality feedback for clinician interpretation.

This repository preserves the [VASCOUT research dossier](https://charm.ing/bloodwave/vascout), its source code, structured evidence records, proposed requirements, partner research prospects, and available presentation assets. It supplies a reproducible data package for the [VASCOUT Foundry project](https://cavelux.usw-22.palantirfoundry.com/workspace/compass/view/ri.compass.main.folder.3447c592-cfe5-408a-b072-da9a2c3406f5).

**Research concept · illustrative · not for patient use.** No measured VASCOUT performance, clinical safety or effectiveness, field suitability, patent novelty, regulatory clearance, or partner commitment is established. The 3D geometry, vessel paths, and workflow animation are synthetic illustrations.

## Contents

| Location | Contents |
| --- | --- |
| `src/charming/` | Faithful server, UI, and stylesheet export from Charming app revision 10 |
| `data/raw/` | Original structured content and partner records |
| `data/normalized/` | Foundry-ready UTF-8 CSV and JSON tables with stable IDs and provenance |
| `data/foundry/` | Canonical 86-row Foundry envelope: record ID, collection, and lossless JSON payload |
| `schemas/` | JSON Schema contracts for the normalized tables |
| `assets/` | Asset inventory and retrieved PDF decks with content hashes |
| `docs/` | Data dictionary, evidence interpretation, Foundry mapping, and source/asset provenance |
| `preview/` | Local preview using the archived UI and a clearly labeled browser-local notes adapter |
| `scripts/` | Literal-only extraction and data-integrity validation |

## Data snapshot

The app's static content snapshot is **20 October 2026**, exported **3 November 2026**, from app revision **10**. It contains **66 records** and **20 explicit citation links**.

The repository includes **9 actual PDF decks**: the current 23-slide main presentation and eight 14-slide partner presentations. The manifest also records two superseded main-deck revisions for traceability; those historical binaries are not included. Each included PDF has a verified byte count and SHA-256 hash.

| Table | Records | Meaning |
| --- | ---: | --- |
| Sources | 30 | 16 evidence references and 14 organization/engagement references |
| Claim audits | 6 | Original propositions paired with bounded audit findings |
| Requirements | 11 | Proposed targets and verification methods |
| Components | 5 | Concept components and required tests |
| Research questions | 6 | Open evidence gates |
| Partner prospects | 8 | Unconfirmed prospects, proposed studies, and unsent draft pitches |
| Relationships | 20 | 6 claim-source and 14 partner-source links |

`CONFIRMED` on a source means the dossier records a bounded source finding. **It does not validate VASCOUT.** On a claim audit, the status applies to the **audit finding**, not the original proposition. For example, the LEDX and chip-channel audits confirm corrections to misleading original claims. See [evidence interpretation](docs/EVIDENCE.md).

## Validate and preview

Run these commands from the repository root with Python 3 available as `python3` and Node.js with npm on your path. No package installation is required.

```sh
npm run validate
npm run export:data
npm run preview -- --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/preview/` to inspect the archived UI. Preview discussion notes stay in that browser's local storage and do not sync to Charming or Foundry. The faithful source still expects Charming's bridge when hosted there; the preview adapter is a separate file.

## Foundry

At handoff, Foundry verification covered the **86-row, three-column** canonical snapshot and all seven flattened datasets. The matching envelope is in `data/foundry/`, and the seven table pairs are in `data/normalized/`. The Pilot frontend, final ontology hydration, actions, indexing, and Main integration were unfinished or unverified. See the [Foundry resources and verification results](docs/FOUNDRY.md) and [data dictionary](docs/DATA_DICTIONARY.md). No live synchronization connection is configured.

The [work handoff](docs/HANDOFF.md) records the verified resources, remaining work, and resume links.

## Source and asset rights

This snapshot was exported for the project owner. No new open-source license or third-party republication right is asserted. Referenced research articles, vendor names, and external materials retain their respective rights; the repository stores citations and the dossier's bounded summaries rather than copies of full papers. The asset manifest identifies project decks and their provenance.
