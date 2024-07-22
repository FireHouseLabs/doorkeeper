import * as server from '../entries/pages/(admin)/admin/invite/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/admin/invite/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/admin/invite/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.CQs1loOb.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js","_app/immutable/chunks/BarsRotateIcon.BQRL8vZ-.js","_app/immutable/chunks/entry.BYxqWVcd.js","_app/immutable/chunks/index.C1mwccGl.js"];
export const stylesheets = [];
export const fonts = [];
