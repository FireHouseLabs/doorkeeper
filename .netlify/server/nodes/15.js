

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forbidden/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/15.OH3cJlcu.js","_app/immutable/chunks/scheduler.DyQmQW35.js","_app/immutable/chunks/index.aTnk53p9.js"];
export const stylesheets = [];
export const fonts = [];
