# Foundation Test Strategy

The extracted App repository has two deliberately separate qualification surfaces: package-boundary tests and the carried Foundation component/use-case suites.

## Extracted App package contract

- `npm test` runs the package-boundary Node tests in `test/*.test.mjs`.
- `npm run test:build` exercises the App browser build contract with the dedicated test Vite configuration.
- `npm run validate` composes those two App-owned package gates.
- Package qualification is run against the exact selected `@tiinex/core` source/package identity. Core-owned Tooling cases are qualified in Core rather than duplicated under App paths.

## Foundation diagnostic contract

- `tools/foundation-acceptance.test.mjs` remains the single standalone Foundation `*.test.mjs` entrypoint.
- Durable carried component/use-case checks live as `*.case.mjs` members of named suites in `tools/foundation-test-suite.contract.mjs`.
- `node tools/run-foundation-suite.mjs --suite smoke` is the smallest representative carried Foundation diagnostic.
- `node tools/run-foundation-suite.mjs --suite integration` is an explicit cross-component diagnostic; it is not App package-version authority and does not replace `npm run validate`.
- A case whose implementation owner moved to Core/provider/Verse must move out of App suite membership instead of surviving as a missing App-local path.

A cold recipient starts with the narrowest owner-correct gate, then escalates only when the task requires cross-component qualification.

## Regression lifecycle

A standalone regression is temporary bug-reproduction evidence for a production defect, not the default response to pre-production implementation change.

After the production fix:
1. keep the durable behavior with the component/package that now owns it;
2. remove stale App-local membership when ownership moved across the extraction boundary;
3. keep cross-package qualification explicit rather than copying the owner implementation back into App;
4. preserve browser/manual and product-parity claims separately from machine qualification.

## Validation layers

- App package: `npm test`.
- App browser build: `npm run test:build`.
- App aggregate package qualification: `npm run validate`.
- Carried Foundation smoke: `node tools/run-foundation-suite.mjs --suite smoke`.
- Carried Foundation integration diagnostic: `node tools/run-foundation-suite.mjs --suite integration`.

Passing any machine layer does not imply current browser/manual product parity.
