# Snapshot provenance

- Source: https://charm.ing/bloodwave/vascout
- App UUID: `7554d8e4-adad-42d3-a2c8-a4e77af46795`
- Manifest ID: `vascout-concept-20261020`
- Stored and active source revision: `10`
- Content snapshot: 20 October 2026
- Export date: 3 November 2026
- Exported files: backend module, frontend UI, stylesheet; the app was still using source buckets rather than a package file tree.

`src/charming` is the unchanged exported source. `scripts/export-data.py` parses only the two literal assignments `VascoutContent` and `VascoutPartners`; it does not execute the UI bundle. Raw JSON preserves the original collections; normalized rows add stable prefixed IDs and explicit status semantics. `data/provenance.json` records source-file SHA-256 hashes and table counts.

The original model is generated procedurally in the UI's canvas code; no CAD, STL, sensor scans, or measured anatomy files are represented as supplied assets. The workflow animation is pre-authored synthetic geometry, not device acquisition. PDF presentations are project assets listed separately in `assets/asset-manifest.json`.

Third-party research and organization references remain citations with the original dossier's access limitations. No independent source re-verification is claimed by the export.

The repository adds documentation, schemas, reproducible data export, integrity checks, and a local preview adapter. These additions do not change the hosted Charming application or configure a live Foundry integration.
