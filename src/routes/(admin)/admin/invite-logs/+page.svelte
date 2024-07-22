<script lang="ts">
    export let data: { logs: Array<{
		 profiles: any; created_at: string; invited_address: string; invited_by: string; 
}> };
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Entry Logs</h1>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Invited Address</th>
                    <th>Invited By</th>
                </tr>
            </thead>
            <tbody>
                {#each data.logs as log (log.created_at)}
                    <tr>
                        <td>{new Date(log.created_at).toLocaleString()}</td>
                        <td>{log.invited_address}</td>
                        <td>{log.profiles.email}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
