# Core/App consumer contract — Turn 1 checkpoint

Status: implemented headless boundary; browser qualification still open.

## Imports

- `@tiinex/core`: parseArtifactMarkdown, projectApplicationData, projectSchemaAncestry, defineCompanionProvider, companionProviderFromWorkspace, resolveCompanionResources, toPlaythingsStoryRecords.
- `@tiinex/core/node`: the shared portable operation API and the browser-safe surface.
- `@tiinex/app`: createTiinexApplicationRuntime, createApplicationDataStore, defineVerse, createVerseRegistry, loadVerse.
- `@tiinex/app/react`: TiinexApplicationRuntimeProvider, useTiinexApplicationData, useVerseHostContext, VerseHost.
- `@tiinex/app/viewer`: mountTiinexApp(element, config), TiinexApplication.
- `@tiinex/app/verse`: external Verse registration and lazy loading.

## Data and truth boundary

App keeps an immutable snapshot outside the mounted Verse. A Viewer state update projects its loaded Workspaces into this store. Snapshots expose artifact ids, schema declarations, Parent references, timestamps, authors, resolved endpoint addresses, relation declarations and Workspace source metadata. The projection is not an independent schema/integrity/authority validation. Unknown input remains unknown; no work occurrence or Handoff acceptance is inferred.

The supplied Playthings headless API accepts neutral story records. The integration fixture exercises that real API against the installed npm packages. It does not certify a renderer, fullscreen behavior or complete participant extraction for every schema.

## Verse export contract

The registered `load()` returns a module with a default function component, `Verse`, or `PlaythingsVerse`. Props are `applicationData`, `getPlaythingsStoryRecords`, `resolveCompanions`, `host`, and `verse`. The host exposes explicit `exitVerse`, `switchVerse`, `setImmersive`, `requestFullscreen` and `readCompanion` capabilities. Browser fullscreen can fail or require a user gesture; it is not promised by registration. A visible exit remains available.

The existing Viewer intake controller stays mounted but hidden while an external Verse is active, preserving source state. It is not duplicated into another repository. This boundary is deliberate; browser regression qualification is pending.

## Companion policy

Artifact-exact resources outrank exact schema, schema ancestors, then generic root resources. Within equal specificity: Workspace, Site, Verse, App, Core. Multi-resource collections append distinct keys; a more specific or higher-layer resource replaces only the same key. Equal-ranked contradictory single resources or collection keys fail closed. Registration order never resolves a conflict.

Providers are data-only explicit registrations. Relative `src/schemas/...` paths may be mirrored across packages without copying schema authority. Loaded Workspace assets can sit beside any artifact, including `.topics/.relations/...`. Workspace paths do not create Relation meaning.

Actual bytes use explicitly registered `resourceReaders`; loaded Workspace PNG data URLs also work. Read results are size-bounded and checked against declared SHA-256 when present. Missing bytes are not fabricated or fetched from the network. The PNG examples in headless byte tests are deliberately synthetic, not graphics-decoding tests.

Automatic package-manifest discovery, exhaustive participant relation projection and namespace-specific inheritance policies are not silently claimed implemented by this checkpoint. A host can already register explicit providers and schema ancestry declarations through the exposed APIs.
