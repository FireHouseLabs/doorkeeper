<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';

	let isSubmitting = false;

	function onClick() {
		isSubmitting = true;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<h1 class="mb-4 text-3xl font-bold">Update Password</h1>
	<p class="mb-4 text-lg">Set a password for your account to access DoorKeeper.</p>
	<form
		use:enhance={() => {
			return async ({ result }) => {
				if (result.status == 303) {
					isSubmitting = false;
					goto('/control', { invalidateAll: true });
				}
			};
		}}
		class="flex w-full flex-col gap-4 lg:w-1/4"
		method="POST"
	>
		<PasswordInput />
		<PasswordInput name="confirm-password" />
		<div class="my-4"></div>
		<button
			on:click={onClick}
			class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"
		>
			<span class="absolute flex w-full flex-col items-center">
				{#if isSubmitting}
					<BarsRotateIcon size={16} />
				{:else}
					Update Password
				{/if}
			</span>
		</button>
	</form>
</div>
