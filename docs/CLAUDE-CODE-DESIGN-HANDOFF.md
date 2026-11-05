# Claude Code dispatch: VASCOUT immersive design upgrade

Implement a substantial visual and interaction upgrade to the existing VASCOUT website. The overall idea is sound; the current release is the working baseline. Deliver the improved, browser-tested experience and a usable preview. Carry the implementation through completion rather than returning only a plan or a written design critique.

## Starting point

- Repository: `https://github.com/mragerlp/VASCOUT`
- Local checkout: `D:\GitHub\VASCOUT`
- Baseline branch: `feature/scroll-showcase`
- Deployed application source: `fc192de730908a5a3e198862bffcbdeb5a6833ad`
- Live baseline: `https://vascout-research-dossier.zerilloj17.workers.dev/`
- Worker: `vascout-research-dossier`; current released version: `e249071c-7cbb-4b64-a7bd-c3c2f31f0b41`.

Read applicable `AGENTS.md` and `CLAUDE.md`, inspect Git status, and preserve concurrent work. Fetch `origin` and create `feature/immersive-showcase` from the latest `origin/feature/scroll-showcase` using a clean checkout or an isolated worktree. The deployed source commit must be an ancestor of your starting point. Default `main` does not yet contain this website implementation. Do not reset or discard existing work. Keep the next iteration reviewable on its own branch.

Inspect the live rendered website and run the local build before redesigning. Save baseline screenshots at desktop and mobile sizes. References the owner named: `https://x-ray.zerilloj17.workers.dev/` and `https://intravenous.app/`. Inspect them if reachable for scroll pacing and spatial storytelling; report inaccessible references honestly. Create a design appropriate to VASCOUT.

## Product and narrative

VASCOUT is the project's Skin Transillumination Device research concept. Ground its technical explanation in the dossier: an ultrasound-led vascular-imaging probe, an experimental photoacoustic channel, a passive contact shoe, and a tethered acquisition/monitoring unit. Proposed applications and device performance remain unvalidated.

Preserve this one-page story:

1. A striking introduction with a concise explanation and an intentional **Enter the site** action.
2. A detailed assembled device with a deliberate reveal and useful scale/context.
3. Scroll-controlled separation of all five components, each connected to its purpose, proposed specifications, interfaces, and required research tests.
4. A compelling non-graphic on-body demonstration using a clearly synthetic forearm.
5. A proposed interpretation/review workflow, then accessible About, Sources, requirements, research questions, and PDF material for deeper reading.

The site should make the proposed device understandable as well as visually impressive. Give the visitor a clear reason to continue scrolling and clear control over the demonstration.

## Highest-priority improvements

### Art direction and spatial composition

Develop a coherent visual system around the graphite probe, warm ivory, copper optical elements, and cyan signal imagery. Improve typography, hierarchy, lighting, materials, depth, transitions, and the relationship between model and explanation. Replace repetitive floating text boxes where a composed editorial section communicates better. Keep body text legible and use negative space deliberately.

Author chapter-specific camera poses and stable framing bounds. The current camera refits the geometry every update, which can make framing breathe as objects appear. Choreograph reveal, component separation, contact close-up, acquisition, and review. At 390 px width the model should occupy roughly 75–85 percent of its stage width with safe margins. Keep every stage uncropped at 320, 390, 768, 1440, and 1920 px widths.

Refine the synthetic forearm shape, end caps, device contact, tether, acquisition unit, and material definition. Use restrained contact shadows and overlays with correct depth behavior. Check every intermediate state for intersections, flicker, disconnected geometry, and unclear silhouettes. Record provenance for any added model, image, texture, or font.

### Component inspection

Connect the five component explanations to the actual meshes: enclosure, ultrasound cartridge, photoacoustic rails, passive contact shoe, and acquisition/monitoring electronics. Add coordinated selection/highlighting, useful anchored labels, isolation or close-up, and Reset View. Pointer and keyboard selection must produce the same state. A deliberate inspection mode may support orbit/drag; ordinary page scrolling must remain native and usable.

### A coordinated live demonstration

The existing illustration moves a scan plane across a mostly stationary probe and forearm. Build a coherent proposed sequence: approach, shoe contact, acquisition, synthetic vessel-map appearance, uncertainty, and expert review. Keep the probe, illustrated scan region, contact boundary, tether attachment, captions, and synthetic output aligned.

Add a clearly labeled illustrative output view, such as a stylized ultrasound panel and/or anatomical cutaway. Explain cyan vessel paths and copper uncertainty marks with a legend. Distinguish a simulated signal from a proposed interpretation. The experimental photoacoustic channel must retain its experimental label. Do not present generated waveforms, anatomy, measurements, or AI overlays as device output or patient data.

Add Play/Pause, Replay, a labeled scrubber, and four stage controls. One intentional action should run the proposed sequence in approximately 30 seconds. Scrolling, playback, stage selection, and scrubbing must share one normalized state; manual input should take control cleanly. Pause freezes the scene, Replay restores Setup, and reversing progress restores earlier geometry and captions. Reduced motion uses useful discrete states without camera travel.

### Mobile experience and navigation

The current mobile demo uses a capped sticky panel with internal scrolling and small explanatory text. Replace it with compact stage controls, one readable active caption, and longer material in normal document flow. Avoid nested vertical scrollbars in the primary demo at 320×568 and 390×844. Maintain controls at least 44 px high and active explanatory text at least 14 px.

Provide visible chapter progress and active navigation state, including `aria-current`. Keep Sources and PDF access easy to find. Preserve native wheel/touch navigation, zoom, visible keyboard focus, meaningful focus transfer, and readable content at 200 percent zoom. Check header/footer overlap and every expanded disclosure. The baseline language is English; preserve `lang="en"`, allow text growth, and use logical CSS properties where useful. Do not claim localization or RTL testing that was not performed.

## Engineering guidance

Important files:

- `web/index.html`: entry, inert/focus handling, chapter anchors, persistent canvas, notices, evidence containers, disclaimer.
- `web/src/main.js`: geometry, scene construction, scroll state, stage navigation, data presentation.
- `web/src/styles.css`: design system and responsive stage/narrative layout.
- `web/vite.config.js`: generated public copies of canonical tables, assets, and archived UI/CSS.
- `web/cloudflare.config.ts`: existing Cloudflare target and workers.dev configuration.
- `web/scripts/verify-build.mjs`: mount checks, copy parity, 14 data files, nine PDF hashes.
- `docs/EVIDENCE.md`, `docs/DATA_DICTIONARY.md`, `docs/PROVENANCE.md`, `docs/FOUNDRY.md`, `docs/HANDOFF.md`, and `docs/SCROLL-PREVIEW.md`: evidence, provenance, release and handoff boundaries. The PDF inventory and hashes are in `assets/asset-manifest.json`.

In `main.js`, inspect `buildDeviceMeshes`, `buildDemoScene`, `pathTube`, `createGeometryFromMesh`, `rebuildDemoScene`, `frameActiveScene`, `applyScrollState`, and `jumpToDemoStage`.

Split story-state calculation, geometry factories, scene control, and DOM/data rendering into focused modules where that improves the implementation. Build reusable meshes/materials once and animate transforms, opacity, and draw ranges. Currently the demo recreates its entire scene at each of up to 181 quantized poses; disposal bounds accumulation but does not prevent allocation and upload hitches. Use proper tube frames and deliberate normals/triangulation rather than relying on DoubleSide to conceal geometry problems.

Preserve deterministic reverse scrolling, bounded resources, on-demand rendering, hidden/offscreen suspension, partial-data recovery, and WebGL fallback. Handle context loss and cleanup. Cap pixel ratio and measure performance on the same browser/device configuration before and after. The baseline JavaScript is approximately 661 kB minified / 182 kB gzip. Improve loading and runtime cost through real changes; do not merely suppress warnings or claim unmeasured frame rates.

The toolchain is Vite, Three.js, GSAP/ScrollTrigger, and pinned `cf`/Cloudflare Vite plugin beta versions. Keep the existing Cloudflare CLI/configuration. Avoid a framework migration unless a specific requirement makes it necessary. Do not hand-edit generated `web/public/data`, `web/public/assets`, `ui.js`, or `styles.css` copies.

## Research and asset boundaries

Preserve the canonical 66 records, 20 explicit citation relationships, seven CSV/JSON pairs, 86-row Foundry envelope, nine actual PDFs, hashes, schemas, and provenance. Keep proposed targets, open research questions, unconfirmed prospects, and unsent draft pitches labeled. All 30 source records and nine PDF links must remain available.

Source findings do not validate VASCOUT. Geometry, forearm anatomy, vessel paths, demonstrations, simulated signals, and AI interpretation illustrations are synthetic. Retain **Research concept · Illustrative · Not for patient use** visibly. Do not imply proven foreign-body/chemical-agent detection, deep-body mapping, surgical safety, diagnostic capability, clinical readiness, or partner commitment.

Foundry changes are outside this website task. At handoff, canonical and seven flattened datasets were recorded as verified; Pilot frontend, final ontology hydration, actions, indexing, and Main integration were unfinished or unverified.

## Verification and delivery

From the repository root:

```sh
npm ci --prefix web
npm run validate
npm run web:build
npm run web:dev
```

Use `npm run web:preview` to inspect the compiled build. Preserve unrelated running servers and use an available local port.

Add a lean, reproducible browser regression test for the main journey. Use semantic controls and condition-based assertions; wait for settled application state rather than arbitrary delays. Exercise the compiled website, not only a development server. Save browser errors and screenshots/traces when a check fails.

Required acceptance:

- Click/keyboard entry and focus/inert behavior work.
- Reveal, all five components, all four demo stages, and reverse scrolling produce repeatable states.
- Component selection, playback, pause, replay, scrubber and stage buttons stay synchronized.
- Ten full round trips do not accumulate geometries, materials, listeners, or render loops.
- The complete site and expanded evidence content remain usable at the specified widths and 200 percent zoom.
- Reduced motion works on initial load and preference changes; a failed table request and missing/lost WebGL preserve usable content.
- Thirty sources, nine PDFs, evidence labels, provenance, and disclaimers remain intact.
- Validation/build and relevant focused tests pass. Browser console and local network requests are clean in normal operation.
- Capture before/after desktop and mobile views of the assembled device, exploded components, and on-body acquisition/review. Inspect the actual rendered motion as well as still images.

The deployed baseline passed 30 live desktop and 27 live mobile/reduced-motion steps with zero page/console errors; all 31 public files matched the build, including 14 data files and nine PDFs. Both GitHub CI workflows passed for `fc192de`. Physical phones, Safari/Firefox, comprehensive accessibility conformance, clinical fidelity, and independent visual acceptance remain unverified.

Deliver an implemented and browser-tested branch, full commit SHA, working preview, concise changed-file/check report, before/after evidence, and explicit remaining limitations. Give the owner a strong new iteration to review. A successful build alone is insufficient evidence of a finished visual experience.
