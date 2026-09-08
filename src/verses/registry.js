export function defineVerse(input = {}) {
  const id = token(input.id);
  if (!id) throw new TypeError('Verse id is required.');
  if (typeof input.load !== 'function') throw new TypeError(`Verse ${id} requires a lazy load() function.`);
  return Object.freeze({
    id,
    label: text(input.label || id),
    load: input.load,
    fullscreen: Boolean(input.fullscreen),
    capabilities: Object.freeze([...(Array.isArray(input.capabilities) ? input.capabilities : [])].map(text).filter(Boolean)),
    companionProviderIds: Object.freeze([...(Array.isArray(input.companionProviderIds) ? input.companionProviderIds : [])].map(text).filter(Boolean)),
    boundary: text(input.boundary || 'Verse projection/presentation only; no implicit Tiinex authority')
  });
}

export function createVerseRegistry(initial = []) {
  const entries = new Map();
  const api = {
    register(definition) {
      const verse = definition?.load ? defineVerse(definition) : definition;
      if (!verse?.id) throw new TypeError('Verse definition is invalid.');
      if (entries.has(verse.id)) throw new Error(`Verse already registered: ${verse.id}`);
      entries.set(verse.id, verse);
      return verse;
    },
    unregister(id) { return entries.delete(token(id)); },
    get(id) { return entries.get(token(id)) || null; },
    has(id) { return entries.has(token(id)); },
    list() { return Object.freeze([...entries.values()].sort((a, b) => codePoint(a.id, b.id))); }
  };
  for (const definition of initial) api.register(definition);
  return Object.freeze(api);
}

export async function loadVerse(registry, id) {
  const definition = registry?.get?.(id);
  if (!definition) return Object.freeze({ status: 'missing', id: token(id), definition: null, module: null });
  try {
    const module = await definition.load();
    return Object.freeze({ status: 'ready', id: definition.id, definition, module });
  } catch (error) {
    return Object.freeze({ status: 'failed', id: definition.id, definition, module: null, error: String(error?.message || error) });
  }
}
function text(value) { return String(value ?? '').trim(); }
function token(value) { return text(value).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, ''); }
function codePoint(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
