import test from 'node:test';import assert from 'node:assert/strict';
import {createApplicationDataStore} from '../src/data/applicationDataStore.js';
import {createCompanionAccess} from '../src/data/companionAccess.js';
test('failing data subscriber does not suppress later observers',()=>{const store=createApplicationDataStore();let called=0;store.subscribe(()=>{throw Error('consumer')});store.subscribe(()=>called++);store.replace({workspaces:[]});assert.equal(called,1);});
test('aborted reads do not call a provider',async()=>{let called=false;const access=createCompanionAccess({resourceReaders:{p:async()=>{called=true;return {bytes:new Uint8Array(1)}}}});await assert.rejects(()=>access.read({providerId:'p'},{signal:AbortSignal.abort()}),{name:'AbortError'});assert.equal(called,false);});
