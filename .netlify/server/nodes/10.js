import * as server from '../entries/pages/(auth)/reset-password/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(auth)/reset-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/reset-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.pKdOP40C.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js","_app/immutable/chunks/BarsRotateIcon.CYJJLv16.js","_app/immutable/chunks/entry.DseKkAxs.js","_app/immutable/chunks/index.C1mwccGl.js"];
export const stylesheets = [];
export const fonts = [];
