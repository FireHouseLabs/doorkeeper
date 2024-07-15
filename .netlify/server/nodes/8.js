import * as server from '../entries/pages/(auth)/email-confirm/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(auth)/email-confirm/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/email-confirm/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.DFnDKl3Y.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js"];
export const stylesheets = [];
export const fonts = [];
