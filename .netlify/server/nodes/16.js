import * as server from '../entries/pages/protected-routes/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/protected-routes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/protected-routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.DqnFB_sr.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js"];
export const stylesheets = [];
export const fonts = [];
