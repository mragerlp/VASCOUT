# Scroll showcase review candidate

The `feature/scroll-showcase` candidate replaces the website entry point with a single-page Three.js experience. The revision-10 Charming source, canonical research tables, PDF binaries, and their manifest remain preserved.

## Review locally

From the repository root:

```sh
npm ci --prefix web
npm run validate
npm run web:build
npm run web:preview
```

Open the loopback URL printed by the server (normally `http://127.0.0.1:4173/`). For development, use `npm run web:dev` (normally port 5173). A loopback preview is accessible on the host computer; it is not a public deployment.

Enter the site, scroll through the assembled probe and five separated component groups, then continue to the synthetic forearm demonstration. The four stages show illustrative placement, a simulated acquisition sweep, synthetic vessel paths, and proposed expert review of uncertainty. Reverse scrolling restores the earlier state. Chapter links and keyboard-accessible stage buttons provide direct navigation.

Sources, component tests, eleven proposed requirements, six open research questions, and nine draft PDF decks remain accessible. No scan, AI inference, clinical interpretation, or treatment decision is performed. Named organizations remain unconfirmed prospects.

## Browser checks

Controlled Chrome checks on Windows on 5 November 2026 covered:

- Keyboard entry and focus transfer into the main content.
- Forward and backward scrolling, five-part separation, and reassembly.
- All four on-body stages and return navigation from Sources.
- A 1440 × 1000 desktop viewport and a 390 × 844 mobile viewport.
- Reduced-motion stage changes with keyboard activation.
- Missing research-table handling and a forced WebGL-unavailable fallback.
- Thirty rendered source records and nine PDF links; all nine local PDF requests returned HTTP 200.

The normal desktop and mobile scenarios produced no uncaught page errors or console errors. Fault fixtures produced the expected HTTP 503 or WebGL-context console errors while preserving entry and readable content. Three repeated demo/reassembly cycles returned the renderer's geometry count to 69; the observed demo range was 145–153. This is a bounded resource-lifecycle check, not a long-duration performance benchmark.

`npm run validate` checks the 66 records, 20 explicit relationships, seven table pairs, 86-row import envelope, source hashes, and nine downloaded PDFs. `npm run web:build` verifies copied research files and PDF hashes. The build currently emits a non-fatal warning about the approximately 661 kB minified JavaScript bundle (approximately 182 kB gzip).

Physical phones, Safari/Firefox, assistive-technology use, a comprehensive accessibility audit, clinical fidelity, and independent visual acceptance are unverified. The synthetic forearm is an explanatory illustration rather than a patient-specific anatomical model.

The redesign has not replaced the published archived website. Foundry status remains as documented in `FOUNDRY.md`: canonical and flattened datasets were verified at handoff; Pilot frontend, ontology hydration, actions, indexing, and Main integration were unfinished or unverified.
