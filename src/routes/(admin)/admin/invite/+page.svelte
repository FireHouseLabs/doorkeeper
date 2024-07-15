<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types.js';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte'; // Loading icon

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			update();
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Invite User</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<form
		use:enhance={handleSubmit}
		class="flex w-full flex-col gap-4 lg:w-1/4"
		action=""
		method="POST"
	>
		<h1 class="text-2xl font-bold mb-4">Invite User</h1>
		<p class="text-gray-600 mb-6">Enter the email address to send an invite link</p>
		
		{#if form?.message !== undefined}
			<div class="mb-4 p-3 rounded {form?.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
				{form?.message}
			</div>
		{/if}

		<div>
			<label class="flex flex-col gap-2 text-xs" for="email">
				<span>Email address</span>
				<input
					class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none"
					type="email"
					name="email"
					placeholder="User's email"
					value={form?.email ?? ''}
				/>
			</label>
			{#if form?.errors?.email}
				<span class="text-red-500 text-sm mt-1 block">
					{form?.errors?.email}
				</span>
			{/if}
		</div>

		<button
			type="submit"
			class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"
			disabled={loading}
		>
			<div class="absolute flex w-full flex-col items-center">
				{#if loading}
					<BarsRotateIcon size={16} />
				{:else}
					Send Invite
				{/if}
			</div>
		</button>
	</form>
</div>