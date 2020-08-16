<script>
    import { onMount }  from 'svelte';
    import sfn from '../services/sfn.js';

    export let params;

    export let state;
    export let actions;

    let id = params.id || undefined;
    let promise;
    let hasFetched = false;
    let library;

    async function getLibraryResult() {
        try {
            library = await sfn.getLibraryResult(id);
            console.log(library);
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
        <p>library</p>
    {:catch error}
        <p>{error.message}</p>
    {/await}
{/if}