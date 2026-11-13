<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isSubmitting = false;
	let formErrors: { error?: string; values?: { email?: string } } = {};

	function onClick() {
		isSubmitting = true;
	}

	function handleFormSubmit({ result }: any) {
		isSubmitting = false;
		if (result.type === 'failure') {
			formErrors = result.data?.resetPassword ?? {};
		} else if (result.status === 303 && result.type === 'redirect') {
			goto('/email-confirm', { invalidateAll: true });
		}
	}

	// Initialize form errors from server-side validation
	$: if (form?.resetPassword) {
		formErrors = form.resetPassword;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<form
		use:enhance={() => {
			return async ({ result }) => handleFormSubmit({ result });
		}}
		class="flex w-full flex-col gap-4 lg:w-1/4"
		method="POST"
	>
		{#if formErrors.error}
			<div class="mb-4 p-3 rounded text-red-700 text-sm bg-red-100">
				{formErrors.error}
			</div>
		{/if}
		<div>
			<label class="flex flex-col gap-2 text-xs" for="email">
				<span>Email</span>
				<input
					class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none"
					type="email"
					name="email"
					autocomplete="email"
					required
					value={formErrors.values?.email ?? ''}
				/>
			</label>
		</div>
		<button
			on:click={onClick}
			class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"
		>
			<span class="absolute flex w-full flex-col items-center">
				{#if isSubmitting}
					<BarsRotateIcon size={16} />
				{:else}
					Reset Password
				{/if}
			</span>
		</button>
	</form>
</div>
