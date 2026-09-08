# @tiinex/app

`@tiinex/app` is the shared Tiinex application layer above `@tiinex/core`.
It owns reusable application state/projection plumbing, Verse registration/lifecycle,
companion-provider composition and the React host boundary. It does not own canonical
Tiinex semantics and does not depend on Site internals.

## Public boundaries

- `@tiinex/app` — dependency-light application runtime and Verse contracts.
- `@tiinex/app/react` — React `VerseHost` and application-data context helpers.

A Site or browser host supplies Workspaces and deployment-specific providers. Verses
receive a read-only application-data snapshot and a bounded host interface; they do not
reach into Site state or invent artifact/schema semantics.
