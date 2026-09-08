import React, { useMemo, useState, useRef, useEffect } from 'react';
import { createTiinexApplicationRuntime } from '../runtime.js';
import { TiinexApplicationRuntimeProvider } from './applicationDataContext.jsx';
import { VerseHost } from './VerseHost.jsx';
import { TiinexApp } from '../app/TiinexApp.jsx';

/** Host-owned composition. Workspace files never become executable Verse code. */
export function TiinexApplication({ config = {} }) {
  const [runtime] = useState(() => createTiinexApplicationRuntime(config));
  const [verseId, setVerseId] = useState('viewer');
  const [immersive, setImmersive] = useState(false);
  const stage = useRef(null);
  const leaveFullscreen = () => { if (document.fullscreenElement === stage.current) void document.exitFullscreen().catch(() => {}); };
  useEffect(() => () => leaveFullscreen(), []);
  const host = useMemo(() => Object.freeze({
    deploymentId: config.deploymentId || 'custom',
    exitVerse: () => { leaveFullscreen(); setImmersive(false); setVerseId('viewer'); },
    switchVerse: (id) => { if (id !== 'viewer' && !runtime.verses.has(id)) throw new Error('Unknown Verse'); leaveFullscreen(); setImmersive(false); setVerseId(id); },
    setImmersive: (value) => setImmersive(Boolean(value)),
    requestFullscreen: async () => { const target = stage.current; if (!target?.requestFullscreen) return false; await target.requestFullscreen(); return true; },
    readCompanion: runtime.readCompanion
  }), [runtime, config.deploymentId]);
  return <TiinexApplicationRuntimeProvider runtime={runtime}>
    {(!immersive || verseId === 'viewer') && runtime.verses.list().length > 0 && <nav aria-label="Tiinex Verses" className="tiinex-verse-switcher">
      <label>View <select value={verseId} onChange={(e) => host.switchVerse(e.target.value)}>
        <option value="viewer">Viewer</option>
        {runtime.verses.list().map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
      </select></label>
    </nav>}
    {/* The Viewer owns the existing intake controller. Hiding, not destroying it,
        retains loaded sources while another Verse consumes the App data store. */}
    <div hidden={verseId !== 'viewer'} inert={verseId !== 'viewer'}><TiinexApp initialWorkspaces={config.workspaces || []} /></div>
    {verseId !== 'viewer' && <section ref={stage} id="tiinex-verse-stage">
      <button type="button" onClick={host.exitVerse} aria-label="Exit Verse">Back to Viewer</button>
      <VerseHost verseId={verseId} registry={runtime.verses} host={host}
        fallback={state => <p role="status">{state.status === 'loading' ? 'Opening view…' : 'This view could not be opened. Return to Viewer or retry.'}</p>} />
    </section>}
  </TiinexApplicationRuntimeProvider>;
}
