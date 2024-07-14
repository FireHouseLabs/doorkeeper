import * as server from '../entries/pages/(admin)/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.CN6tI2ob.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js","_app/immutable/chunks/entry.DVrDpmsd.js","_app/immutable/chunks/index.C1mwccGl.js"];
export const stylesheets = [];
export const fonts = [];
