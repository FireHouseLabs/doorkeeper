<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';
	let isLogin = false;
	let formErrors: { error?: string; values?: { email?: string } } = {};

	function onClick() {
		isLogin = true;
	}

	function handleFormSubmit({ result }) {
		isLogin = false;
		if (result.type === 'failure') {
			formErrors = result.data.signinWithPassword ?? {};
		} else {
			window.location.href = '/control';
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<form
		use:enhance={(form) => async (result) => handleFormSubmit(result)}
		class="flex w-full flex-col gap-4 lg:w-1/4"
		action="?/login" 
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
		<PasswordInput />
		<div class="my-"></div>
		<button
			type="submit"
			on:click={onClick}
			class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"
		>
			<div class="absolute flex w-full flex-col items-center">
				{#if isLogin}
					<BarsRotateIcon size={16} />
				{:else}
					Login
				{/if}
			</div>
		</button>
		<div class="flex flex-row items-center justify-center">
			<a
				class="text-center text-xs font-semibold tracking-tight text-green-600 hover:underline"
				aria-label="forgot password"
				href="reset-password">Forgot Password?</a
			>
		</div>
	</form>
</div>
