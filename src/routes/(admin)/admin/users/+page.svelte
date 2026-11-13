<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';
	import type { ActionData, ActionData as FormAction } from './$types';
	import { Shield, ShieldOff, Trash2, Users } from 'lucide-svelte';

	export let data;
	export let form: FormAction;

	let processingUserId: string | null = null;

	$: users = data.users ?? [];

	function handleAction({ result }: { result: any }) {
		processingUserId = null;
		if (result.type === 'success') {
			toast.push('Action completed successfully', { classes: ['success'] });
		} else if (result.type === 'failure') {
			toast.push(result.data?.message ?? 'An error occurred', { classes: ['error'] });
		}
	}

	function startProcessing(userId: string) {
		processingUserId = userId;
	}
</script>

<div class="flex h-full w-full flex-col items-center p-4">
	<div class="w-full max-w-4xl">
		<div class="mb-6 flex items-center gap-2">
			<Users class="h-6 w-6" />
			<h1 class="text-2xl font-bold">User Management</h1>
		</div>

		{#if data.error}
			<div class="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
				{data.error}
			</div>
		{/if}

		<div class="overflow-x-auto rounded-lg bg-white shadow">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Email</th>
						<th>Status</th>
						<th>Last Sign In</th>
						<th>Admin</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each users as user}
						<tr>
							<td class="font-medium">{user.email}</td>
							<td>
								<span
									class="badge {user.status === 'joined'
										? 'badge-success'
										: user.status === 'invited'
											? 'badge-warning'
											: 'badge-info'}"
								>
									{user.status}
								</span>
							</td>
							<td class="text-sm text-gray-500">
								{user.last_sign_in_at
									? new Date(user.last_sign_in_at).toLocaleDateString()
									: 'Never'}
							</td>
							<td>
								<form
									method="POST"
									action="?/toggleAdmin"
									use:enhance={() => {
										startProcessing(user.id);
										return async ({ result }) => handleAction({ result });
									}}
								>
									<input type="hidden" name="userId" value={user.id} />
									<input type="hidden" name="isAdmin" value={String(user.site_admin)} />
									<button
										type="submit"
										disabled={processingUserId === user.id}
										class="btn btn-ghost btn-xs"
										title={user.site_admin ? 'Remove Admin' : 'Make Admin'}
									>
										{#if processingUserId === user.id}
											<span class="loading loading-spinner loading-xs"></span>
										{:else if user.site_admin}
											<Shield class="h-4 w-4 text-green-600" />
										{:else}
											<ShieldOff class="h-4 w-4 text-gray-400" />
										{/if}
									</button>
								</form>
							</td>
							<td>
								<form
									method="POST"
									action="?/deleteUser"
									use:enhance={() => {
										startProcessing(user.id);
										return async ({ result }) => handleAction({ result });
									}}
									on:submit={(e) => {
										if (!confirm(`Are you sure you want to delete ${user.email}?`)) {
											e.preventDefault();
											processingUserId = null;
										}
									}}
								>
									<input type="hidden" name="userId" value={user.id} />
									<button
										type="submit"
										disabled={processingUserId === user.id}
										class="btn btn-ghost btn-xs text-red-600 hover:bg-red-100"
										title="Delete User"
									>
										{#if processingUserId === user.id}
											<span class="loading loading-spinner loading-xs"></span>
										{:else}
											<Trash2 class="h-4 w-4" />
										{/if}
									</button>
								</form>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5" class="text-center py-8 text-gray-500">No users found</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
