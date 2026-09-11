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
  - Created At: 2026-09-11 16:58:53
  - Authors: Anchor
  - Why: Correct repository-boundary placement prospectively without rewriting historical continuity.
  - Summary: App repository-local orchestration frontier
  - Status: ready/local

---

# App repository-local orchestration frontier

## Objective

Keep App shared data-plane and Verse-host work artifacts inside the App repository lineage while Business remains coordination context.

## Done Criteria

- New App specialist work continues from App-local Parent artifacts.
- Viewer/Verse/product work is not placed in App unless the shared App boundary actually owns it.
- Cross-repository dependencies remain qualified references rather than implicit ownership transfers.

## Scope

Repository-boundary placement for future App work only.

## Dependencies

- Current App Turn-2 host and data-plane stabilization frontier.
- Business repository-boundary placement correction as coordination context.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-turn-2-app-host-and-data-plane-stabilization.trace.md](../001-turn-2-app-host-and-data-plane-stabilization.trace.md)
  - Value: EGOaFvAOpP9ZTIWoS9KTTpvSORJOAhmHnx80oHrLuxQ

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: uGBcyWSeYa6ppXmj6v9ZJh6J6qsOLC_DyTEfZDibi78