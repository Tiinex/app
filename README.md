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

## Current implementation frontier

`@tiinex/app` is a published package boundary. Publication proves neither rendered browser acceptance nor semantic authority; Site and Verse integration retain their own qualification gates.

`@tiinex/app/viewer` exports `mountTiinexApp(element, config)` and `TiinexApplication`. The Viewer source now lives here at the original relative `src/...` paths; Site owns only composition. `@tiinex/app/verse` exports the external Verse registry. Existing product Verse configuration and external package registration are separate contracts. React, ReactDOM and FontAwesome are optional peers for headless consumers but required by the Viewer entrypoint; Site supplies their exact versions.


## npm release frontier

Master-only automatic versioning/publication reuses the Core Node release helper through App's thin `tools/release.mjs` wrapper. See `docs/NPM-PUBLISH.md`. OIDC/Trusted Publisher settings remain external to this repository source.
