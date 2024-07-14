<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import { DoorClosed, Menu, X } from 'lucide-svelte'; // Import the necessary icons

	export let session: Session | null;

	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<div class="flex h-20 w-screen flex-row items-center justify-between gap-4 p-4 px-6 shadow-md">
	<a class="flex items-center font-semibold tracking-tighter" href="/">
		<DoorClosed class="mr-2 h-6 w-6" />
		DoorKeeper</a>
	<div class="hidden md:flex flex-row items-center gap-8">
		{#if session && session.user}
			<p class="rounded-full bg-zinc-600 px-4 py-1 text-xs text-white">{session.user.email}</p>
		{/if}
		<ul class="flex flex-row gap-4">
			{#if !session}
				<li><a class="text-xs font-light uppercase" href="/login">Login</a></li>
				<!-- <li><a class="text-xs font-light uppercase" href="/signup">Signup</a></li> -->
			{/if}
			{#if session && session.user}
				<!-- <li><a class="text-xs font-light uppercase" href="/profile">Profile</a></li> -->
				<li><a class="text-xs font-light uppercase" href="/logout">Logout</a></li>
				<li><a class="text-xs font-light uppercase" href="/control">Door Control</a></li>
			{/if}
		</ul>
	</div>
	<div class="md:hidden">
		<button class="focus:outline-none" on:click={toggleMobileMenu}>
			{#if isMobileMenuOpen}
				<X class="h-6 w-6" />
			{:else}
				<Menu class="h-6 w-6" />
			{/if}
		</button>
	</div>
</div>

{#if isMobileMenuOpen}
	<div class="absolute top-20 left-0 w-full bg-white shadow-md md:hidden">
		<ul class="flex flex-col items-center gap-4 p-4">
			{#if session && session.user}
				<p class="rounded-full bg-zinc-600 px-4 py-1 text-xs text-white">{session.user.email}</p>
			{/if}
			{#if !session}
				<li><a class="text-xs font-light uppercase" href="/login">Login</a></li>
				<!-- <li><a class="text-xs font-light uppercase" href="/signup">Signup</a></li> -->
			{/if}
			{#if session && session.user}
				<!-- <li><a class="text-xs font-light uppercase" href="/profile">Profile</a></li> -->
				<li><a class="text-xs font-light uppercase" href="/logout">Logout</a></li>
				<li><a class="text-xs font-light uppercase" href="/control">Door Control</a></li>
			{/if}
		</ul>
	</div>
{/if}
