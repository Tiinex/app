import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';

const TiinexApplicationRuntimeContext = createContext(null);

export function TiinexApplicationRuntimeProvider({ runtime, children }) {
  if (!runtime?.data?.subscribe || !runtime?.data?.getSnapshot) throw new TypeError('A Tiinex application runtime is required.');
  return React.createElement(TiinexApplicationRuntimeContext.Provider, { value: runtime }, children);
}

export function useTiinexApplicationRuntime() {
  const runtime = useContext(TiinexApplicationRuntimeContext);
  if (!runtime) throw new Error('TiinexApplicationRuntimeProvider is missing.');
  return runtime;
}

export function useTiinexApplicationData() {
  const runtime = useTiinexApplicationRuntime();
  return useSyncExternalStore(runtime.data.subscribe, runtime.data.getSnapshot, runtime.data.getServerSnapshot);
}

export function useVerseHostContext(extraHost = {}) {
  const runtime = useTiinexApplicationRuntime();
  const applicationData = useTiinexApplicationData();
  return useMemo(() => Object.freeze({
    applicationData,
    getPlaythingsStoryRecords: runtime.getPlaythingsStoryRecords,
    resolveCompanions: runtime.resolveCompanions,
    host: Object.freeze({ ...extraHost })
  }), [runtime, applicationData, extraHost]);
}
