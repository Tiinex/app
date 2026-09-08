import test from 'node:test';
import assert from 'node:assert/strict';
import { createCompanionAccess } from '../src/data/companionAccess.js';
test('loaded Workspace image bytes stay accessible through explicit handles',async()=>{
 const access=createCompanionAccess();access.setWorkspaces([{id:'w',assets:[{path:'.topics/.relations/x.playthings.portrait.png',dataUrl:'data:image/png;base64,AQID'}]}]);
 const result=await access.read({providerId:'workspace:w',path:'.topics/.relations/x.playthings.portrait.png'});
 assert.deepEqual([...result.bytes],[1,2,3]);assert.equal(result.integrity,'not-declared');
 access.setWorkspaces([]);await assert.rejects(()=>access.read({providerId:'workspace:w',path:'.topics/.relations/x.playthings.portrait.png'}));
});
test('resource readers are registered explicitly and verify a declared digest',async()=>{
 const access=createCompanionAccess({resourceReaders:{p:async()=>({bytes:new Uint8Array([1,2,3]),mediaType:'image/png'})}});
 await assert.rejects(()=>access.read({providerId:'p',path:'x',sha256:'0'.repeat(64)}),/integrity mismatch/);
 await assert.rejects(()=>access.read({providerId:'unregistered',path:'x'}),/No resource reader/);
});
