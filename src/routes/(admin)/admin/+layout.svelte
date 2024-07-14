<script lang="ts" context="module">
    import { redirect } from '@sveltejs/kit';
    
    export const load = async ({ parent }: any) => {
        const { session, supabase } = await parent();

        if (!session) {
            console.log("Access Denied");
            throw redirect(303, "/");
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('site_admin')
            .eq('id', session.user.id)
            .single();

        if (!profile?.site_admin) {
            return {
                forbidden: true,
                message: "You must be an administrator to access this page."
            };
        }

        return {
            user: session.user,
            site_admin: profile.site_admin
        };
    };
</script>

<script lang="ts">
    import { goto } from '$app/navigation';
    export let forbidden: boolean;
    export let message: string;
    export let user: any;
</script>

{#if forbidden}
    <div class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div class="mx-auto max-w-md rounded-lg border-2 border-red-600 bg-red-100 p-6 text-center shadow-lg">
            <h1 class="mb-2 text-3xl font-bold text-red-600">Access Denied</h1>
            <p class="mb-4 text-lg text-black">{message}</p>
            <button
                class="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                on:click={() => goto('/control')}
            >
                Return to Control Interface
            </button>
        </div>
    </div>
{:else}
    <slot />
{/if}
