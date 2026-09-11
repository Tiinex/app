#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { FOUNDATION_TEST_GROUPS, FOUNDATION_TEST_SUITES, foundationSuiteSummary } from './foundation-test-suite.contract.mjs';

const root = process.cwd();
const allCases = FOUNDATION_TEST_SUITES.all;
assert.equal(new Set(allCases).size, allCases.length, 'permanent suite cases must be uniquely owned');
for (const file of allCases) assert(statSync(join(root, file)).isFile(), `suite case missing:${file}`);
assert.equal(allCases.includes('src/tooling/portable/bootstrap/bootstrap.case.mjs'), false, 'Core-owned portable bootstrap qualification must not remain App suite-owned');

const testEntrypoints = walk(root)
  .map((file) => relative(root, file).replaceAll('\\', '/'))
  .filter((file) => file.endsWith('.test.mjs'))
  .sort();
const foundationEntrypoints = testEntrypoints.filter((file) => file.startsWith('tools/'));
const packageEntrypoints = testEntrypoints.filter((file) => file.startsWith('test/'));
assert.deepEqual(foundationEntrypoints, ['tools/foundation-acceptance.test.mjs'], 'Foundation keeps one standalone diagnostic entrypoint');
assert(packageEntrypoints.length > 0, 'extracted App keeps package-boundary tests under test/');
assert.equal(testEntrypoints.length, foundationEntrypoints.length + packageEntrypoints.length, 'standalone tests belong only to App package qualification or the Foundation diagnostic entrypoint');

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
assert.equal(packageJson.name, '@tiinex/app', 'suite contract is scoped to the extracted App package');
assert.equal(packageJson.scripts?.test, 'node --test test/*.test.mjs', 'generic npm test is the extracted App package-boundary gate');
assert.equal(packageJson.scripts?.['test:build'], 'vite build --config test/browser/vite.config.mjs', 'App browser build qualification remains explicit');
assert.equal(packageJson.scripts?.validate, 'npm test && npm run test:build', 'App validate composes package tests and browser build without resurrecting Site validation ownership');

const strategy = readFileSync(join(root, 'docs/architecture/foundation-test-strategy.md'), 'utf8');
assert(strategy.includes('`npm test` runs the package-boundary Node tests in `test/*.test.mjs`'), 'durable strategy must describe extracted App package-test ownership');
assert(strategy.includes('Core-owned Tooling cases are qualified in Core rather than duplicated under App paths'), 'durable strategy must describe cross-package qualification ownership');
assert(strategy.includes('`node tools/run-foundation-suite.mjs --suite integration` is an explicit cross-component diagnostic'), 'durable strategy must keep Foundation integration explicit and non-authoritative for package identity');

const summary = foundationSuiteSummary();
assert.equal(summary.standaloneTestEntrypoints, 1);
assert.equal(summary.permanentCases, allCases.length);
assert.equal(Object.values(FOUNDATION_TEST_GROUPS).reduce((count, cases) => count + cases.length, 0), allCases.length);

console.log(`✓ Foundation test-suite contract: extracted App package tests + 1 Foundation entrypoint; ${allCases.length} App-owned suite cases`);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (['.git', 'node_modules', '.site-publish', '.tiinex'].includes(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walk(path));
    else if (stat.isFile()) out.push(path);
  }
  return out;
}
