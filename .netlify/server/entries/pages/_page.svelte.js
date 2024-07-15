import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="bg-gray-50 text-gray-800" data-svelte-h="svelte-1c7basf"><div class="container mx-auto p-4 lg:p-16"><div class="flex flex-col lg:flex-row items-center justify-between"><div class="lg:w-1/2"><h1 class="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-5xl">Welcome to DoorKeeper</h1> <p class="mb-6 text-lg text-gray-700">Control and manage access with ease, directly from your browser or smart phone. Our platform provides seamless door management, user tracking, and security monitoring.</p> <div><a href="/login" class="mr-4 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">Login</a> </div></div> <div class="mt-8 lg:mt-0 lg:w-1/2"><img class="w-full rounded-lg shadow-lg" src="hero-image.jpg" alt="Phone with access granted green check"></div></div></div></section>`;
});
export {
  Page as default
};
