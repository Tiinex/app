import { schemaRegistry } from '@tiinex/core/schemas/registry.js';
import { projectSchemaAncestry } from '@tiinex/core';
import { createCompanionAccess } from './data/companionAccess.js';
import { companionProviderFromWorkspace, projectApplicationData, resolveCompanionResources, toPlaythingsStoryRecords } from '@tiinex/core';
import { createApplicationDataStore } from './data/applicationDataStore.js';
import { createVerseRegistry } from './verses/hostRegistry.js';

export function createTiinexApplicationRuntime(options = {}) {
  const store = createApplicationDataStore();
  const access = createCompanionAccess(options);
  const schemas = Object.freeze((options.schemaDeclarations || schemaRegistry.modules.map(m => ({id:m.id,parentSchemaId:m.parentSchemaId,checksum:m.binding?.checksum?.value || '',basis:'installed-schema-module-declaration'}))).map(s => Object.freeze({...s})));
  const verses = options.verses?.get ? options.verses : createVerseRegistry(options.verses || []);
  let configuredProviders = Object.freeze([...(options.companionProviders || [])]);
  let workspaceProviders = Object.freeze([]);
  let workspaceProviderFindings = Object.freeze([]);

  const api = {
    data: store,
    verses,
    setWorkspaces(workspaces = []) {
      access.setWorkspaces(workspaces);
      const projected = Object.freeze({ ...projectApplicationData({ workspaces }), schemas });
      const derived = workspaces.map((workspace) => companionProviderFromWorkspace(workspace));
      workspaceProviders = Object.freeze(derived.map((item) => item.provider));
      workspaceProviderFindings = Object.freeze(derived.flatMap((item) => item.findings || []));
      store.replace(projected);
      return projected;
    },
    setCompanionProviders(providers = []) {
      configuredProviders = Object.freeze([...(Array.isArray(providers) ? providers : [])]);
      return api.getCompanionProviders();
    },
    getCompanionProviders() { return Object.freeze([...workspaceProviders, ...configuredProviders]); },
    getCompanionProviderFindings() { return workspaceProviderFindings; },
    schemaAncestry: (schemaId) => projectSchemaAncestry(schemaId, schemas),
    resolveCompanions(query) {
      const matches = store.getSnapshot().records.filter(r => r.workspaceId === query.owner?.workspaceId && r.path === query.owner?.artifactPath);
      const id = query.owner?.schemaId || (matches.length === 1 ? matches[0].schemaId : '');
      const ancestry = projectSchemaAncestry(id, schemas);
      if (['ambiguous','cycle'].includes(ancestry.status)) return Object.freeze({status:'blocked',resources:Object.freeze([]),findings:Object.freeze([{code:'companion.schema-ancestry.'+ancestry.status}])});
      return resolveCompanionResources({ providers: api.getCompanionProviders(), query: { ...query, schemaLineage: query.schemaLineage || ancestry.lineage } });
    },
    getPlaythingsStoryRecords() { return toPlaythingsStoryRecords(store.getSnapshot()); },
    async readCompanion(resource, options) {
      const entries=api.getCompanionProviders().flatMap(p=>p.resources || []);
      const matches=entries.filter(r=>r.providerId===resource?.providerId && r.id===resource?.id && r.path===resource?.path && r.sha256===resource?.sha256);
      if(matches.length!==1) throw new Error('Companion selection is stale, ambiguous or unregistered.');
      return access.read(matches[0],options);
    },
    getSnapshot() { return store.getSnapshot(); }
  };
  if (Array.isArray(options.workspaces)) api.setWorkspaces(options.workspaces);
  return Object.freeze(api);
}
