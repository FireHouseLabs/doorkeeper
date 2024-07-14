import * as server from '../entries/pages/(admin)/admin/entry-logs/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/admin/entry-logs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/admin/entry-logs/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BMlXarpY.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js","_app/immutable/chunks/each.CRDqCe-b.js"];
export const stylesheets = [];
export const fonts = [];
