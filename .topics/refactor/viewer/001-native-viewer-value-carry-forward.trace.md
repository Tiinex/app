# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 14:58:56
  - Trace: [001-turn-2-app-host-and-data-plane-stabilization.trace.md](../001-turn-2-app-host-and-data-plane-stabilization.trace.md)
  - Origin:
    - [relative](../001-turn-2-app-host-and-data-plane-stabilization.trace.md)
- Current
  - Current Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 14:58:58
  - Authors: Anchor
  - Why: Turn 2 is not stable if package boundaries improve while the ordinary Viewer regresses.
  - Summary: Carry accepted Viewer value into the new Verse decomposition without preserving obsolete implementation coupling.
  - Status: ready/local

---

# Native Viewer value carry-forward

## Objective

Preserve and recover the human-observable Viewer capabilities that matter while concrete Native presentation moves out of App.

## Done Criteria

- Navigation, lineage legibility, progressive detail and visible uncertainty/degradation remain explicit acceptance targets.
- PoC-proven product value is distinguished from obsolete PoC implementation architecture.
- Native presentation extraction has a bounded handoff to the future `verse-native` Workspace once its current source is supplied.
- Viewer work is qualified in a real browser path before human acceptance is requested.

## Scope

Carry-forward and extraction boundary only; do not freeze final Native Verse internals inside App.

## Dependencies

- Parent App Turn-2 task.
- Existing Viewer parity carry-forward `.topics/002-viewer-parity-carry-forward-task.trace.md`.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-turn-2-app-host-and-data-plane-stabilization.trace.md](../001-turn-2-app-host-and-data-plane-stabilization.trace.md)
  - Value: EGOaFvAOpP9ZTIWoS9KTTpvSORJOAhmHnx80oHrLuxQ

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: V4lqtEvqlDIrat2khGrV_GI62IItGa_vmgYJtEoLht4