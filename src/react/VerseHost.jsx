import React, { useEffect, useState } from 'react';
import { loadVerse } from '../verses/hostRegistry.js';
import { useVerseHostContext } from './applicationDataContext.jsx';

export function VerseHost({ verseId, registry, host = {}, fallback = null, onLoadState = null }) {
  const context = useVerseHostContext(host);
  const [state, setState] = useState(() => ({ status: 'loading', id: verseId, module: null, definition: registry?.get?.(verseId) || null }));
  useEffect(() => {
    let active = true;
    setState({ status: 'loading', id: verseId, module: null, definition: registry?.get?.(verseId) || null });
    loadVerse(registry, verseId).then((next) => {
      if (!active) return;
      setState(next);
      onLoadState?.(next);
    });
    return () => { active = false; };
  }, [registry, verseId, onLoadState]);

  if (state.id !== verseId || state.status !== 'ready') return typeof fallback === 'function' ? fallback(state) : fallback;
  const Component = state.module?.default || state.module?.Verse || state.module?.PlaythingsVerse;
  if (typeof Component !== 'function') return typeof fallback === 'function' ? fallback({ ...state, status: 'invalid-module' }) : fallback;
  return React.createElement(Component, Object.freeze({
    applicationData: context.applicationData,
    getPlaythingsStoryRecords: context.getPlaythingsStoryRecords,
    resolveCompanions: context.resolveCompanions,
    host: context.host,
    verse: state.definition
  }));
}
