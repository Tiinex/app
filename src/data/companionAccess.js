export function createCompanionAccess(options = {}) {
  const readers = new Map(Object.entries(options.resourceReaders || {}));
  let assets = new Map();
  return Object.freeze({
    setWorkspaces(workspaces) {
      assets = new Map(workspaces.flatMap(w => (w.assets || []).map(asset => [`workspace:${w.id}::${asset.path}`, asset])));
    },
    async read(resource, { signal } = {}) {
      signal?.throwIfAborted();
      if (!resource?.providerId) throw new TypeError('Resolved companion resource required.');
      const reader = readers.get(resource.providerId);
      let result;
      if (reader) result = await reader(Object.freeze({ ...resource }), { signal, maxBytes: options.maxResourceBytes || 16 * 1024 * 1024 });
      else if (resource.providerId.startsWith('workspace:')) {
        const asset = assets.get(`${resource.providerId}::${resource.path}`);
        if (!asset) throw new Error('Companion bytes are not available in this Workspace.');
        if (asset.bytes instanceof Uint8Array) result = { bytes: new Uint8Array(asset.bytes), mediaType: asset.type || asset.mediaType };
        else if (/^data:image\/png;base64,/i.test(asset.dataUrl || '')) {
          const encoded = asset.dataUrl.slice(asset.dataUrl.indexOf(',') + 1);
          result = { bytes: Uint8Array.from(atob(encoded), c => c.charCodeAt(0)), mediaType: 'image/png' };
        } else throw new Error('Companion metadata is present, but its bytes must be loaded first.');
      } else throw new Error('No resource reader registered for this companion provider.');
      signal?.throwIfAborted();
      if (!(result?.bytes instanceof Uint8Array)) throw new TypeError('Resource reader must return Uint8Array bytes.');
      if (result.bytes.length > (options.maxResourceBytes || 16 * 1024 * 1024)) throw new Error('Companion exceeds the configured byte limit.');
      const bytes = new Uint8Array(result.bytes);
      if (resource.sha256) {
        if (!/^[a-f0-9]{64}$/i.test(resource.sha256)) throw new Error('Invalid companion digest declaration.');
        const digest = Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', bytes)), n => n.toString(16).padStart(2,'0')).join('');
        if (digest !== resource.sha256.toLowerCase()) throw new Error('Companion integrity mismatch.');
      }
      return Object.freeze({ bytes, mediaType: result.mediaType || resource.mediaType || 'application/octet-stream', integrity: resource.sha256 ? 'verified' : 'not-declared' });
    }
  });
}
