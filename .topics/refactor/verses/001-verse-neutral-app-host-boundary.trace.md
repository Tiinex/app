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
  - Created At: 2026-09-09 14:58:57
  - Authors: Anchor
  - Why: Verse packages must be independently installable without making App a hidden native presentation bundle.
  - Summary: Separate generic Universe/Verse hosting from concrete presentation packages.
  - Status: ready/local

---

# Verse-neutral App host boundary

## Objective

Make App the neutral host for Verse registration, Universe/Multiverse composition and shared application state without owning concrete Native, Atlas or Playthings presentation.

## Done Criteria

- Concrete Verse UI can be packaged outside App and registered through public contracts.
- One Workspace may be presented through a Verse and multi-workspace compositions remain supported without equating Workspace identity with Verse identity.
- Playthings host requirements can be satisfied through generic host contracts rather than private App internals.
- Native Viewer extraction has an explicit migration boundary and no accepted user value is silently dropped.

## Scope

Generic host/runtime contracts only. Presentation-specific behavior belongs in Verse repositories.

## Dependencies

- Parent App Turn-2 task.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-turn-2-app-host-and-data-plane-stabilization.trace.md](../001-turn-2-app-host-and-data-plane-stabilization.trace.md)
  - Value: EGOaFvAOpP9ZTIWoS9KTTpvSORJOAhmHnx80oHrLuxQ

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: M6i2vj4NOXyZ74JkMe2cyz_JoPdOGLd2NiSFwNJzXOo