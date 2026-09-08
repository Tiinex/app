import { companionProviderFromWorkspace, projectApplicationData, resolveCompanionResources, toPlaythingsStoryRecords } from '@tiinex/core';
import { createApplicationDataStore } from './data/applicationDataStore.js';
import { createVerseRegistry } from './verses/registry.js';

export function createTiinexApplicationRuntime(options = {}) {
  const store = createApplicationDataStore();
  const verses = options.verses?.get ? options.verses : createVerseRegistry(options.verses || []);
  let configuredProviders = Object.freeze([...(options.companionProviders || [])]);
  let workspaceProviders = Object.freeze([]);
  let workspaceProviderFindings = Object.freeze([]);

  const api = {
    data: store,
    verses,
    setWorkspaces(workspaces = []) {
      const projected = projectApplicationData({ workspaces });
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
    resolveCompanions(query) { return resolveCompanionResources({ providers: api.getCompanionProviders(), query }); },
    getPlaythingsStoryRecords() { return toPlaythingsStoryRecords(store.getSnapshot()); },
    getSnapshot() { return store.getSnapshot(); }
  };
  if (Array.isArray(options.workspaces)) api.setWorkspaces(options.workspaces);
  return Object.freeze(api);
}
