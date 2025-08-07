<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isSubmitting = false;
	let formErrors: { error?: string; values?: { password?: string; confirmPassword?: string } } = {};
	let passwordValue = '';
	let confirmPasswordValue = '';

	function onClick() {
		isSubmitting = true;
	}

	function handleFormSubmit({ result }: any) {
		isSubmitting = false;
		if (result.type === 'failure') {
			formErrors = result.data?.updatePassword ?? {};
			// Clear password fields on error for security
			passwordValue = '';
			confirmPasswordValue = '';
		} else if (result.status === 303 && result.type === 'redirect') {
			goto('/control', { invalidateAll: true });
		}
	}

	// Initialize form errors from server-side validation
	$: if (form?.updatePassword) {
		formErrors = form.updatePassword;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<h1 class="mb-4 text-3xl font-bold">Update Password</h1>
	<p class="mb-4 text-lg">Set a password for your account to access DoorKeeper.</p>
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
		
		<!-- Password Requirements -->
		<div class="mb-4 p-3 rounded text-sm bg-blue-50 border border-blue-200">
			<h3 class="font-semibold text-blue-800 mb-2">Password Requirements:</h3>
			<ul class="text-blue-700 space-y-1 text-xs">
				<li>• At least 8 characters long</li>
				<li>• Contains uppercase and lowercase letters</li>
				<li>• Contains at least one number</li>
				<li>• Contains at least one special character</li>
			</ul>
		</div>
		
		<PasswordInput bind:value={passwordValue} name="password" label="New Password" />
		<PasswordInput bind:value={confirmPasswordValue} name="confirm-password" label="Confirm Password" />
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
