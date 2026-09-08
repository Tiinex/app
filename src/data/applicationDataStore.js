export function createApplicationDataStore(initialSnapshot = null) {
  let snapshot = deepFreeze(initialSnapshot ?? emptySnapshot());
  const listeners = new Set();
  return Object.freeze({
    getSnapshot: () => snapshot,
    getServerSnapshot: () => snapshot,
    subscribe(listener) {
      if (typeof listener !== 'function') throw new TypeError('listener must be a function');
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    replace(nextSnapshot) {
      if (!nextSnapshot || typeof nextSnapshot !== 'object') throw new TypeError('application data snapshot must be an object');
      const next = deepFreeze(nextSnapshot);
      if (next === snapshot) return snapshot;
      snapshot = next;
      for (const listener of [...listeners]) listener();
      return snapshot;
    }
  });
}
function emptySnapshot() { return { schema: 'tiinex.core.application-data.v1', workspaces: [], records: [], relations: [], findings: [], boundary: 'empty application data' }; }
function deepFreeze(value) { if (Array.isArray(value)) return Object.freeze(value.map(deepFreeze)); if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value; return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepFreeze(item)]))); }
