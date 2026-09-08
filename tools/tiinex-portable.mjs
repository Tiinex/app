#!/usr/bin/env node
import { runPortableCli } from '@tiinex/core/tooling/portable/adapters/cli/cli.run.js';
import { portableCanonicalBootstrapRuntime } from '@tiinex/core/tooling/portable/schema/bootstrap/canonical.pack.js';

const exitCode = await runPortableCli(process.argv.slice(2), console, portableCanonicalBootstrapRuntime);
process.exitCode = exitCode;
