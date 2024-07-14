import { n as noop, c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_object, k as escape_attribute_value, a as each, v as validate_component, e as escape, l as assign, o as identity, d as subscribe, p as onDestroy, m as missing_component, b as add_attribute, q as null_to_empty } from "../../chunks/ssr.js";
import "../../chunks/client.js";
import { t as toast } from "../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import { w as writable } from "../../chunks/index2.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
/**
 * @license lucide-svelte v0.407.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode = [] } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Door_closed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"
      }
    ],
    ["path", { "d": "M2 20h20" }],
    ["path", { "d": "M14 12v.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "door-closed" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
var define_PKG_default = { name: "supabase-auth", version: "1.0.2", private: true, scripts: { dev: "vite dev --open --port 5174", build: "vite build", preview: "vite preview", check: "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json", "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch", lint: "prettier --check . && eslint .", format: "prettier --write ." }, devDependencies: { "@sveltejs/adapter-auto": "^3.0.0", "@sveltejs/adapter-netlify": "^4.3.1", "@sveltejs/kit": "^2.0.0", "@sveltejs/vite-plugin-svelte": "^3.0.0", "@types/eslint": "8.56.0", "@typescript-eslint/eslint-plugin": "^6.0.0", "@typescript-eslint/parser": "^6.0.0", "@zerodevx/svelte-toast": "^0.9.5", autoprefixer: "^10.4.16", eslint: "^8.56.0", "eslint-config-prettier": "^9.1.0", "eslint-plugin-svelte": "^2.35.1", postcss: "^8.4.32", "postcss-load-config": "^5.0.2", prettier: "^3.1.1", "prettier-plugin-svelte": "^3.1.2", "prettier-plugin-tailwindcss": "^0.5.9", svelte: "^4.2.7", "svelte-check": "^3.6.0", tailwindcss: "^3.3.6", tslib: "^2.4.1", typescript: "^5.0.0", vite: "^5.0.3" }, type: "module", dependencies: { "@supabase/ssr": "^0.1.0", "@supabase/supabase-js": "^2.39.3", daisyui: "^4.6.0", "lucide-svelte": "^0.407.0", "svelte-toast": "^1.0.0" } };
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { session } = $$props;
  if ($$props.session === void 0 && $$bindings.session && session !== void 0) $$bindings.session(session);
  return `<div class="flex h-20 w-screen flex-row items-center justify-between gap-4 p-4 px-6 shadow-md"><a class="flex items-center font-semibold tracking-tighter" href="/">${validate_component(Door_closed, "DoorClosed").$$render($$result, { class: "mr-2 h-6 w-6" }, {}, {})}
		DoorKeeper</a> <div class="hidden md:flex flex-row items-center gap-8">${session && session.user ? `<p class="rounded-full bg-zinc-600 px-4 py-1 text-xs text-white">${escape(session.user.email)}</p>` : ``} <ul class="flex flex-row gap-4">${!session ? `<li data-svelte-h="svelte-1xp2v0w"><a class="text-xs font-light uppercase" href="/login">Login</a></li>` : ``} ${session && session.user ? `<li data-svelte-h="svelte-1cdsi26"><a class="text-xs font-light uppercase" href="/logout">Logout</a></li> <li data-svelte-h="svelte-2qw6g"><a class="text-xs font-light uppercase" href="/control">Door Control</a></li> <li>v${escape(define_PKG_default.version)}</li>` : ``}</ul></div> <div class="md:hidden"><button class="focus:outline-none">${`${validate_component(Menu, "Menu").$$render($$result, { class: "h-6 w-6" }, {}, {})}`}</button></div></div> ${``}`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$1 = {
  code: "._toastItem.svelte-95rq8t{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(\n    --toastBoxShadow,\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\n  );border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;flex-direction:row;align-items:center;overflow:hidden;will-change:transform, opacity;-webkit-tap-highlight-color:transparent}._toastMsg.svelte-95rq8t{padding:var(--toastMsgPadding, 0.75rem 0.5rem);flex:1 1 0%}.pe.svelte-95rq8t,._toastMsg.svelte-95rq8t a{pointer-events:auto}._toastBtn.svelte-95rq8t{width:var(--toastBtnWidth, 2rem);height:var(--toastBtnHeight, 100%);cursor:pointer;outline:none}._toastBtn.svelte-95rq8t::after{content:var(--toastBtnContent, '✕');font:var(--toastBtnFont, 1rem sans-serif);display:flex;align-items:center;justify-content:center}._toastBar.svelte-95rq8t{top:var(--toastBarTop, auto);right:var(--toastBarRight, auto);bottom:var(--toastBarBottom, 0);left:var(--toastBarLeft, 0);height:var(--toastBarHeight, 6px);width:var(--toastBarWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}._toastBar.svelte-95rq8t::-webkit-progress-bar{background:transparent}._toastBar.svelte-95rq8t::-webkit-progress-value{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}._toastBar.svelte-95rq8t::-moz-progress-bar{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}",
  map: `{"version":3,"file":"ToastItem.svelte","sources":["ToastItem.svelte"],"sourcesContent":["<script>\\nimport { onMount, onDestroy } from 'svelte'\\nimport { tweened } from 'svelte/motion'\\nimport { linear } from 'svelte/easing'\\nimport { toast } from './stores.js'\\n\\n/** @type {import('./stores.js').SvelteToastOptions} */\\nexport let item\\n\\n/** @type {any} */\\nlet next = item.initial\\nlet prev = next\\nlet paused = false\\nlet cprops = {}\\n/** @type {any} */\\nlet unlisten\\n\\nconst progress = tweened(item.initial, { duration: item.duration, easing: linear })\\n\\nfunction close() {\\n  toast.pop(item.id)\\n}\\n\\nfunction autoclose() {\\n  if ($progress === 1 || $progress === 0) close()\\n}\\n\\nfunction pause() {\\n  if (!paused && $progress !== next) {\\n    progress.set($progress, { duration: 0 })\\n    paused = true\\n  }\\n}\\n\\nfunction resume() {\\n  if (paused) {\\n    const d = /** @type {any} */ (item.duration)\\n    const duration = d - d * (($progress - prev) / (next - prev))\\n    progress.set(next, { duration }).then(autoclose)\\n    paused = false\\n  }\\n}\\n\\n/** @param {any} prop */\\nfunction check(prop, kind = 'undefined') {\\n  return typeof prop === kind\\n}\\n\\nfunction listen(d = document) {\\n  if (check(d.hidden)) return\\n  const handler = () => (d.hidden ? pause() : resume())\\n  const name = 'visibilitychange'\\n  d.addEventListener(name, handler)\\n  unlisten = () => d.removeEventListener(name, handler)\\n  handler()\\n}\\n\\n$: if (next !== item.next) {\\n  next = item.next\\n  prev = $progress\\n  paused = false\\n  progress.set(next).then(autoclose)\\n}\\n\\n$: if (item.component) {\\n  const { props = {}, sendIdTo } = item.component\\n  cprops = { ...props, ...(sendIdTo && { [sendIdTo]: item.id }) }\\n}\\n\\n// \`progress\` has been renamed to \`next\`; shim included for backward compatibility, to remove in next major\\n$: if (!check(item.progress)) {\\n  item.next = item.progress\\n}\\n\\nonMount(listen)\\n\\nonDestroy(() => {\\n  if (check(item.onpop, 'function')) {\\n    // @ts-ignore\\n    item.onpop(item.id)\\n  }\\n  unlisten && unlisten()\\n})\\n<\/script>\\n\\n<div\\n  role=\\"status\\"\\n  class=\\"_toastItem\\"\\n  class:pe={item.pausable}\\n  on:mouseenter={() => {\\n    if (item.pausable) pause()\\n  }}\\n  on:mouseleave={resume}\\n>\\n  <div class=\\"_toastMsg\\" class:pe={item.component}>\\n    {#if item.component}\\n      <svelte:component this={item.component.src} {...cprops} />\\n    {:else}\\n      {@html item.msg}\\n    {/if}\\n  </div>\\n  {#if item.dismissable}\\n    <div\\n      class=\\"_toastBtn pe\\"\\n      role=\\"button\\"\\n      tabindex=\\"0\\"\\n      on:click={close}\\n      on:keydown={(e) => {\\n        if (e instanceof KeyboardEvent && ['Enter', ' '].includes(e.key)) close()\\n      }}\\n    />\\n  {/if}\\n  <progress class=\\"_toastBar\\" value={$progress} />\\n</div>\\n\\n<style>\\n._toastItem {\\n  width: var(--toastWidth, 16rem);\\n  height: var(--toastHeight, auto);\\n  min-height: var(--toastMinHeight, 3.5rem);\\n  margin: var(--toastMargin, 0 0 0.5rem 0);\\n  padding: var(--toastPadding, 0);\\n  background: var(--toastBackground, rgba(66, 66, 66, 0.9));\\n  color: var(--toastColor, #fff);\\n  box-shadow: var(\\n    --toastBoxShadow,\\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\\n  );\\n  border: var(--toastBorder, none);\\n  border-radius: var(--toastBorderRadius, 0.125rem);\\n  position: relative;\\n  display: flex;\\n  flex-direction: row;\\n  align-items: center;\\n  overflow: hidden;\\n  will-change: transform, opacity;\\n  -webkit-tap-highlight-color: transparent;\\n}\\n._toastMsg {\\n  padding: var(--toastMsgPadding, 0.75rem 0.5rem);\\n  flex: 1 1 0%;\\n}\\n.pe,\\n._toastMsg :global(a) {\\n  pointer-events: auto;\\n}\\n._toastBtn {\\n  width: var(--toastBtnWidth, 2rem);\\n  height: var(--toastBtnHeight, 100%);\\n  cursor: pointer;\\n  outline: none;\\n}\\n._toastBtn::after {\\n  content: var(--toastBtnContent, '✕');\\n  font: var(--toastBtnFont, 1rem sans-serif);\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n._toastBar {\\n  top: var(--toastBarTop, auto);\\n  right: var(--toastBarRight, auto);\\n  bottom: var(--toastBarBottom, 0);\\n  left: var(--toastBarLeft, 0);\\n  height: var(--toastBarHeight, 6px);\\n  width: var(--toastBarWidth, 100%);\\n  position: absolute;\\n  display: block;\\n  -webkit-appearance: none;\\n  -moz-appearance: none;\\n  appearance: none;\\n  border: none;\\n  background: transparent;\\n  pointer-events: none;\\n}\\n._toastBar::-webkit-progress-bar {\\n  background: transparent;\\n}\\n/* \`--toastProgressBackground\` renamed to \`--toastBarBackground\`; override included for backward compatibility */\\n._toastBar::-webkit-progress-value {\\n  background: var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)));\\n}\\n._toastBar::-moz-progress-bar {\\n  background: var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)));\\n}</style>\\n"],"names":[],"mappings":"AAoHA,yBAAY,CACV,KAAK,CAAE,IAAI,YAAY,CAAC,MAAM,CAAC,CAC/B,MAAM,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAChC,UAAU,CAAE,IAAI,gBAAgB,CAAC,OAAO,CAAC,CACzC,MAAM,CAAE,IAAI,aAAa,CAAC,aAAa,CAAC,CACxC,OAAO,CAAE,IAAI,cAAc,CAAC,EAAE,CAAC,CAC/B,UAAU,CAAE,IAAI,iBAAiB,CAAC,sBAAsB,CAAC,CACzD,KAAK,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,CAC9B,UAAU,CAAE;AACd,IAAI,gBAAgB,CAAC;AACrB;AACA;AACA,EAAE,CAAC,CACD,MAAM,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAChC,aAAa,CAAE,IAAI,mBAAmB,CAAC,SAAS,CAAC,CACjD,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,SAAS,CAAC,CAAC,OAAO,CAC/B,2BAA2B,CAAE,WAC/B,CACA,wBAAW,CACT,OAAO,CAAE,IAAI,iBAAiB,CAAC,eAAe,CAAC,CAC/C,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,EACZ,CACA,iBAAG,CACH,wBAAU,CAAS,CAAG,CACpB,cAAc,CAAE,IAClB,CACA,wBAAW,CACT,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACnC,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IACX,CACA,wBAAU,OAAQ,CAChB,OAAO,CAAE,IAAI,iBAAiB,CAAC,IAAI,CAAC,CACpC,IAAI,CAAE,IAAI,cAAc,CAAC,gBAAgB,CAAC,CAC1C,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MACnB,CACA,wBAAW,CACT,GAAG,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAC7B,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,EAAE,CAAC,CAChC,IAAI,CAAE,IAAI,cAAc,CAAC,EAAE,CAAC,CAC5B,MAAM,CAAE,IAAI,gBAAgB,CAAC,IAAI,CAAC,CAClC,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,cAAc,CAAE,IAClB,CACA,wBAAU,sBAAuB,CAC/B,UAAU,CAAE,WACd,CAEA,wBAAU,wBAAyB,CACjC,UAAU,CAAE,IAAI,yBAAyB,CAAC,oDAAoD,CAChG,CACA,wBAAU,mBAAoB,CAC5B,UAAU,CAAE,IAAI,yBAAyB,CAAC,oDAAoD,CAChG"}`
};
function check(prop, kind = "undefined") {
  return typeof prop === kind;
}
const ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { item } = $$props;
  let next = item.initial;
  let cprops = {};
  const progress = tweened(item.initial, { duration: item.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  function close() {
    toast.pop(item.id);
  }
  function autoclose() {
    if ($progress === 1 || $progress === 0) close();
  }
  onDestroy(() => {
    if (check(item.onpop, "function")) {
      item.onpop(item.id);
    }
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  $$result.css.add(css$1);
  {
    if (!check(item.progress)) {
      item.next = item.progress;
    }
  }
  {
    if (next !== item.next) {
      next = item.next;
      progress.set(next).then(autoclose);
    }
  }
  {
    if (item.component) {
      const { props = {}, sendIdTo } = item.component;
      cprops = {
        ...props,
        ...sendIdTo && { [sendIdTo]: item.id }
      };
    }
  }
  $$unsubscribe_progress();
  return `<div role="status" class="${["_toastItem svelte-95rq8t", item.pausable ? "pe" : ""].join(" ").trim()}"><div class="${["_toastMsg svelte-95rq8t", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign({}, cprops), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div> ${item.dismissable ? `<div class="_toastBtn pe svelte-95rq8t" role="button" tabindex="0"></div>` : ``} <progress class="_toastBar svelte-95rq8t"${add_attribute("value", $progress, 0)}></progress> </div>`;
});
const css = {
  code: "._toastContainer.svelte-1u812xz{top:var(--toastContainerTop, 1.5rem);right:var(--toastContainerRight, 2rem);bottom:var(--toastContainerBottom, auto);left:var(--toastContainerLeft, auto);position:fixed;margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastContainerZIndex, 9999)}",
  map: `{"version":3,"file":"SvelteToast.svelte","sources":["SvelteToast.svelte"],"sourcesContent":["<script>\\nimport { fade, fly } from 'svelte/transition'\\nimport { flip } from 'svelte/animate'\\nimport { toast } from './stores.js'\\nimport ToastItem from './ToastItem.svelte'\\n\\n/** @type {import('./stores.js').SvelteToastOptions} */\\nexport let options = {}\\n/** @type {(string|'default')} */\\nexport let target = 'default'\\n\\n/** @type {import('./stores.js').SvelteToastOptions[]} */\\nlet items = []\\n\\n/** @param {Object<string,string|number>} [theme] */\\nfunction getCss(theme) {\\n  return theme ? Object.keys(theme).reduce((a, c) => \`\${a}\${c}:\${theme[c]};\`, '') : undefined\\n}\\n\\n$: toast._init(target, options)\\n\\n$: items = $toast.filter((i) => i.target === target)\\n<\/script>\\n\\n<ul class=\\"_toastContainer\\">\\n  {#each items as item (item.id)}\\n    <li\\n      class={item.classes?.join(' ')}\\n      in:fly={item.intro}\\n      out:fade\\n      animate:flip={{ duration: 200 }}\\n      style={getCss(item.theme)}\\n    >\\n      <ToastItem {item} />\\n    </li>\\n  {/each}\\n</ul>\\n\\n<style>\\n._toastContainer {\\n  top: var(--toastContainerTop, 1.5rem);\\n  right: var(--toastContainerRight, 2rem);\\n  bottom: var(--toastContainerBottom, auto);\\n  left: var(--toastContainerLeft, auto);\\n  position: fixed;\\n  margin: 0;\\n  padding: 0;\\n  list-style-type: none;\\n  pointer-events: none;\\n  z-index: var(--toastContainerZIndex, 9999);\\n}</style>\\n"],"names":[],"mappings":"AAuCA,+BAAiB,CACf,GAAG,CAAE,IAAI,mBAAmB,CAAC,OAAO,CAAC,CACrC,KAAK,CAAE,IAAI,qBAAqB,CAAC,KAAK,CAAC,CACvC,MAAM,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAAC,CACzC,IAAI,CAAE,IAAI,oBAAoB,CAAC,KAAK,CAAC,CACrC,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,IAAI,CACrB,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAC3C"}`
};
function getCss(theme) {
  return theme ? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "") : void 0;
}
const SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  let { options = {} } = $$props;
  let { target = "default" } = $$props;
  let items = [];
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  $$result.css.add(css);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="_toastContainer svelte-1u812xz">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes?.join(" ")), true) + " svelte-1u812xz"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})} </li>`;
  })} </ul>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let supabase;
  let session;
  let { data } = $$props;
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ supabase, session } = data);
  return `  ${validate_component(Navbar, "Navbar").$$render($$result, { session }, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(SvelteToast, "SvelteToast").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
