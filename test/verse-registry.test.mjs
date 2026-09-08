import test from 'node:test';
import assert from 'node:assert/strict';
import { createVerseRegistry, defineVerse, loadVerse } from '../src/index.js';

test('Verse registry is explicit, lazy and duplicate-safe', async () => {
  let loads = 0;
  const registry = createVerseRegistry();
  registry.register(defineVerse({ id: 'Playthings', fullscreen: true, load: async () => { loads += 1; return { default: function Verse() {} }; } }));
  assert.equal(loads, 0);
  assert.equal(registry.get('playthings').fullscreen, true);
  assert.equal((await loadVerse(registry, 'playthings')).status, 'ready');
  assert.equal(loads, 1);
  assert.throws(() => registry.register(defineVerse({ id: 'playthings', load: async () => ({}) })), /already registered/);
});
