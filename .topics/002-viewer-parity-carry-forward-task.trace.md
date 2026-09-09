# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-08 17:38:00
  - Trace: [001-extraction-task.trace.md](001-extraction-task.trace.md)
  - Origin:
    - [relative](001-extraction-task.trace.md)
- Current
  - Current Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 02:00:30
  - Authors: Anchor
  - Why: Allow Site history reduction without losing Viewer intent or mistaking the old monolith branch layout for current architecture.
  - Summary: Carry reusable Viewer product obligations from historical Site parity planning into App without restoring Site implementation ownership.
  - Status: ready/local

---

# Viewer parity carry-forward after App extraction

## Objective

Carry forward the still-relevant Viewer product contracts from the historical Site-local Viewer PoC parity plan into the reusable App boundary, so Site history can be reduced without losing intended Viewer behavior or making Site the implementation owner again.

## Done Criteria

- App owns reusable Viewer behavior for intake/workspace use, artifact reading/navigation, canonical actions, persistence/recovery, source/history projection, export/publication presentation and truthful capability/status surfaces where those behaviors are application-level rather than host deployment policy.
- Historical PoC/refactor observations remain evidence, not branch authority or a requirement to restore the monolith module structure.
- Browser/human parity not requalified after extraction remains visible as an acceptance gap rather than silently declared complete.
- Site stays a thin deployment/configuration host and does not reacquire reusable Viewer implementation merely to satisfy parity.
- App continues to consume Core public contracts rather than copy or privately import Core implementation.
- A future App role can decompose product work from this current task without traversing the full historical Site Viewer lineage.

## Scope

Reusable Viewer/application behavior only. Deployment-specific Pages/runtime configuration remains Site. Canonical schema semantics remain Docs; shared host-neutral mechanics remain Core. Playthings remains a separately owned Verse and does not define Viewer parity.

## Dependencies

- [App extraction task](001-package-extraction-task.trace.md)
- [Turn-2 repository boundary decision](business::.topics/initiatives/001-3-6-4-1-repository-bootstrap-responsibility-boundary-decision.trace.md)
- Historical source set: `site::.topics/viewer/001-viewer-poc-parity-recovery-implementation-task.trace.md` and its `001-1` through `001-6` discovery/task decomposition.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-extraction-task.trace.md](001-extraction-task.trace.md)
  - Value: pPdO-ttREQ5kR-pBzHidi2TY2tqZeCVuCS4S0BmkO4o

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: _YkV53lAQMwTlXIGL_S4GQTRRWWgDyNJVMnLChuWt4U