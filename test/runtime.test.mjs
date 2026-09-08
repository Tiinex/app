import test from 'node:test';
import assert from 'node:assert/strict';
import { createTiinexApplicationRuntime, createVerseRegistry, defineVerse, loadVerse } from '../src/index.js';

const ROOT = `# Continuity Context\n\n- Envelope Schema: tiinex.root.v1\n- Current\n  - Current Schema: tiinex.task.v1\n  - Created At: 2026-09-08 10:00:00\n  - Authors: Anchor\n  - Summary: Root\n\n---\n\n# Root\n`;
const CHILD = `# Continuity Context\n\n- Envelope Schema: tiinex.root.v1\n- Parent\n  - Parent Schema: tiinex.task.v1\n  - Trace: [Root](001-root.trace.md)\n- Current\n  - Current Schema: tiinex.task.v1\n  - Created At: 2026-09-08 10:01:00\n  - Authors: Anchor; Sigma\n  - Summary: Child\n\n---\n\n# Child\n`;

test('runtime keeps a read-only application snapshot across Verse lifecycle', async () => {
  const registry = createVerseRegistry([defineVerse({ id: 'playthings', fullscreen: true, load: async () => ({ default: () => null }) })]);
  const runtime = createTiinexApplicationRuntime({ verses: registry, workspaces: [{ id: 'site', records: [{ path: '001-root.trace.md', markdown: ROOT }, { path: '002-child.trace.md', markdown: CHILD }], assets: [] }] });
  const before = runtime.getSnapshot();
  const loaded = await loadVerse(registry, 'playthings');
  assert.equal(loaded.status, 'ready');
  assert.equal(loaded.definition.fullscreen, true);
  assert.equal(runtime.getSnapshot(), before);
  assert.equal(runtime.getPlaythingsStoryRecords().length, 2);
  assert.throws(() => { runtime.getSnapshot().records.push({}); }, TypeError);
});

test('runtime automatically composes artifact-local Workspace companion providers', () => {
  const runtime = createTiinexApplicationRuntime({ workspaces: [{ id: 'site', records: [{ path: '.topics/.relations/r.trace.md', markdown: ROOT }], assets: [{ path: '.topics/.relations/r.playthings.portrait.png' }] }] });
  const result = runtime.resolveCompanions({ namespace: 'playthings', slot: 'portrait', owner: { kind: 'artifact', workspaceId: 'site', artifactPath: '.topics/.relations/r.trace.md' }, schemaLineage: ['tiinex.relation.v1', 'tiinex.root.v1'] });
  assert.equal(result.status, 'resolved');
  assert.equal(result.resources[0].providerId, 'workspace:site');
});
