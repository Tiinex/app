# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-08 17:38:00
  - Trace: [001-extraction-task.trace.md](../001-extraction-task.trace.md)
  - Origin:
    - [relative](../001-extraction-task.trace.md)
- Current
  - Current Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 14:58:56
  - Authors: Anchor
  - Why: Decompose Turn 2 into an App-owned lineage while preparing concrete provider and Verse extraction.
  - Summary: Stabilize App as provider-neutral Universe/Verse host and shared application data plane.
  - Status: ready/local

---

# Turn 2 App host and data-plane stabilization

## Objective

Reduce App to provider-neutral application data, Universe/Verse hosting and shared application mechanics while concrete presentation and provider implementations move behind explicit boundaries.

## Done Criteria

- App can operate without GitHub-specific implementation and without concrete Playthings/native presentation ownership.
- Universe/Verse lifecycle and shared application-data contracts are explicit enough for independent Verse packages.
- Current Viewer value is preserved through a planned native-verse extraction rather than silently removed.
- Focused App/package qualification passes against exact Core source.

## Scope

Shared application host/data plane. Do not absorb concrete provider implementations or Verse-specific presentation.

## Dependencies

- Controlling Business epic: `business::.topics/initiatives/refactor/001-turn-2-stable-full-source-frontier.trace.md`.
- Existing App extraction task `.topics/001-extraction-task.trace.md`.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-extraction-task.trace.md](../001-extraction-task.trace.md)
  - Value: pPdO-ttREQ5kR-pBzHidi2TY2tqZeCVuCS4S0BmkO4o

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: EGOaFvAOpP9ZTIWoS9KTTpvSORJOAhmHnx80oHrLuxQ