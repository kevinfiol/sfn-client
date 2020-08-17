<script>
    import { onMount }  from 'svelte';
    import sfn from '../services/sfn.js';
    import Card from '../components/Card.svelte';

    export let params;

    export let state;
    export let actions;

    let id = params.id || undefined;
    let promise;
    let hasFetched = false;
    let library;
    let categories;

    async function getLibraryResult() {
        try {
            const result = await sfn.getLibraryResult(id);
            library = result.libraryResult;
            categories = result.categories;
        } catch(e) {
            throw e;
        }
    }

    onMount(async () => {
        // check if already exists in state, otherwise...
        // could use a Promise.resolve to get from existing state
        hasFetched = true;
        promise = getLibraryResult();
    });
</script>

{#if hasFetched}
    {#await promise}
        <p>loading...</p>
    {:then}
        <div class="my-6">
            <h2 class="text-2xl">showing library intersection of:</h2>
            <div class="flex flex-wrap">
                <div class="w-full sm:w-1/2 md:w-1/4 p-2">
                    <Card user={library.profiles.user} />
                </div>
                {#each library.profiles.friends as friend}
                    <div class="w-full sm:w-1/2 md:w-1/4 p-2">
                        <Card user={friend} />
                    </div>
                {/each}
            </div>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
{/if}