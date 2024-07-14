<script lang="ts">
    export let data: { logs: Array<{ created_at: string; user_email: string; door_name: string; status: boolean }> };
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Entry Logs</h1>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>User Email</th>
                    <th>Door Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each data.logs as log (log.created_at)}
                    <tr class={log.status ? 'bg-green-100 text-grey-900' : 'bg-red-100'}>
                        <td>{new Date(log.created_at).toLocaleString()}</td>
                        <td>{log.user_email}</td>
                        <td>{log.door_name}</td>
                        <td>
                            {#if log.status}
                                <span class="badge badge-success">Success</span>
                            {:else}
                                <span class="badge badge-error">Failed</span>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
