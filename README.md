# VASCOUT

VASCOUT is a vascular-imaging **research concept**: an ultrasound-led probe with an experimental photoacoustic channel, a passive contact interface, and explicit image-quality feedback for clinician interpretation.

This repository preserves the [VASCOUT research dossier](https://charm.ing/bloodwave/vascout), its source code, structured evidence records, proposed requirements, partner research prospects, and available presentation assets. It supplies a reproducible data package for the [VASCOUT Foundry project](https://cavelux.usw-22.palantirfoundry.com/workspace/compass/view/ri.compass.main.folder.3447c592-cfe5-408a-b072-da9a2c3406f5).

The revision-10 package was [published on GitHub](https://github.com/mragerlp/VASCOUT/commit/cfc32968c1b5c2317edc66b0957cbad866e5f919) on 3 November 2026.

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
| `web/` | Vite/Three.js scroll showcase for Cloudflare Workers Static Assets |
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

## Website build

The website now provides an Enter screen, a scroll-controlled assembled/exploded probe, all five component explanations, proposed requirements, and a four-stage synthetic on-body illustration with a tethered acquisition unit. Scroll backward to reverse the sequence, or use the chapter links and demo stage buttons. Sources and nine draft PDF decks remain available below the experience. Reduced-motion preferences use discrete scene states; browsers without WebGL receive a static illustration and readable research content.

The scroll showcase was published on 5 November 2026 from `feature/scroll-showcase`, source commit `fc192de730908a5a3e198862bffcbdeb5a6833ad`. The separate archived preview retains browser-local notes; the scroll showcase does not provide a discussion-notes editor.

See [scroll preview instructions and browser-check boundaries](docs/SCROLL-PREVIEW.md).

From the repository root, use Node.js 22.23 or later 22.x, npm, and Python 3 available as `python3`:

```sh
npm ci --prefix web
npm run validate
npm run web:build
npm run web:dev
```

Stop the development server, then inspect the built website:

```sh
npm run web:preview
```

Open the local URL printed by the server. The pinned `cf` tool builds the Workers Static Assets package under `web/.cloudflare/output/v0/`. Its static files are in `workers/default/assets/`. The build checks the archived source copies, all 14 data files, and the nine PDF hashes.

## Publish to workers.dev

The live scroll showcase is [vascout-research-dossier.zerilloj17.workers.dev](https://vascout-research-dossier.zerilloj17.workers.dev). The 5 November 2026 release used [source commit `fc192de730908a5a3e198862bffcbdeb5a6833ad`](https://github.com/mragerlp/VASCOUT/commit/fc192de730908a5a3e198862bffcbdeb5a6833ad) and Cloudflare Worker version `e249071c-7cbb-4b64-a7bd-c3c2f31f0b41`. Live HTTPS verification matched all 31 public files to the build, including all 14 data files and nine PDFs. Live Chrome checks passed 30 desktop and 27 mobile/reduced-motion steps with no uncaught page errors or console errors. The [website build](https://github.com/mragerlp/VASCOUT/actions/runs/42036673397) and [research validation](https://github.com/mragerlp/VASCOUT/actions/runs/42036673670) CI runs passed for this source commit.

The earlier archived release used commit `a69945b6cec3d396dfcfc2139b79557969d46e87` and Worker version `04f3c092-89d1-4c14-8165-64e8b7df9141`; its historical source remains available.

Use an authenticated Cloudflare `cf` profile with Workers write access. For initial sign-in, run `npx cf auth login` from `web/` and complete the browser authorization. Set `CLOUDFLARE_ACCOUNT_ID` in the deployment environment when selecting a specific account.

From the repository root, run the release command.

```sh
npm run web:deploy
```

This validates the research package, builds and checks the static assets, then publishes that build as `vascout-research-dossier`. The configuration enables its `workers.dev` address. The command prints the deployed URL and Worker version for verification.

## Foundry

At handoff, Foundry verification covered the **86-row, three-column** canonical snapshot and all seven flattened datasets. The matching envelope is in `data/foundry/`, and the seven table pairs are in `data/normalized/`. The Pilot frontend, final ontology hydration, actions, indexing, and Main integration were unfinished or unverified. See the [Foundry resources and verification results](docs/FOUNDRY.md) and [data dictionary](docs/DATA_DICTIONARY.md). No live synchronization connection is configured.

The [work handoff](docs/HANDOFF.md) records the verified resources, remaining work, and resume links.

## Source and asset rights

This snapshot was exported for the project owner. No new open-source license or third-party republication right is asserted. Referenced research articles, vendor names, and external materials retain their respective rights; the repository stores citations and the dossier's bounded summaries rather than copies of full papers. The asset manifest identifies project decks and their provenance.
