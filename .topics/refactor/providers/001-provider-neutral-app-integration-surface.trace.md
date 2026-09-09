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
  - Why: Provider-neutral App is required for scalable independent provider repositories.
  - Summary: Extract provider-specific application behavior behind generic provider capabilities.
  - Status: ready/local

---

# Provider-neutral App integration surface

## Objective

Remove GitHub/native provider-specific application policy from App and expose only generic provider registration, capability consumption and UI integration contracts.

## Done Criteria

- App contains no GitHub-host assumptions in generic source/materialization paths.
- Provider-specific browse/git/native behavior is supplied through registered provider implementations.
- App remains debuggable with zero external providers installed.
- Provider changes can be tested through small capability/use-case boundaries rather than provider-name switches.

## Scope

App provider integration surface only. Concrete providers belong in provider repositories.

## Dependencies

- Parent App Turn-2 task.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-turn-2-app-host-and-data-plane-stabilization.trace.md](../001-turn-2-app-host-and-data-plane-stabilization.trace.md)
  - Value: EGOaFvAOpP9ZTIWoS9KTTpvSORJOAhmHnx80oHrLuxQ

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: OF7yxLFFdVHayYtNEwpNM8wZBMzvdki9XQI8Wq40Wx8