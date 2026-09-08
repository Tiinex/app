import React from 'react';
import packageMetadata from '../package.json' with {type:'json'};
import { createRoot } from 'react-dom/client';

import './ui/icon.paths.js';
import './workspaces/workspace.config.js';
import { tiinexBuildIdentity, TIINEX_RUNTIME_ID } from './build.identity.js';
import './sources/source.identity.js';
import './workspaces/workspace.lifecycle.js';
import './workspaces/workspace.route.js';
import './workspaces/workspace.persistenceRecovery.js';
import './workspaces/workspace.persistenceRouteCache.js';
import './workspaces/workspace.persistencePresentation.js';
import './workspaces/workspace.persistenceCache.js';
import './workspaces/workspace.persistenceClear.js';
import './workspaces/workspace.persistence.js';

import './styles/tokens.css';
import './styles/theme.css';
import './styles/responsive.css';
import './styles/app.css';

import { TiinexApplication } from './react/TiinexApplication.jsx';


export { TiinexApplication };
export function mountTiinexApp(element, config = {}) {
  if (!element) throw new TypeError('A mount element is required.');
  const root = createRoot(element);
  const identity = Object.freeze({ ...tiinexBuildIdentity(), applicationPackage: '@tiinex/app', applicationVersion: packageMetadata.version, deploymentId: config.deploymentId || 'custom' });
  element.ownerDocument.documentElement.dataset.tiinexRuntime = TIINEX_RUNTIME_ID;
  root.render(React.createElement(TiinexApplication, { config }));
  return Object.freeze({ identity, unmount: () => root.unmount() });
}
