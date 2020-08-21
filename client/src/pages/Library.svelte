<script>
    import { onMount }  from 'svelte';
    import sfn from '../services/sfn.js';
    import Card from '../components/Card.svelte';
    import Game from '../components/Game.svelte';
    import Checkbox from '../components/Checkbox.svelte';
    import Radio from '../components/Radio.svelte';

    export let params;

    export let state;
    export let actions;

    let id = params.id || undefined;
    let promise;
    let hasFetched = false;

    let games;
    let players;
    let categories;

    async function getLibraryResult() {
        try {
            let result;

            if ($state.libraryResult && $state.categories) {
                result = await Promise.resolve({
                    libraryResult: $state.libraryResult,
                    categories: $state.categories
                });
            } else {
                result = await sfn.getLibraryResult(id);
            }
            console.log(result);
            games = result.libraryResult.steamapps;
            players = result.libraryResult.profiles.players;
            categories = result.categories;
        } catch(e) {
            throw e;
        }
    }

    onMount(async () => {
        console.log(state);

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
                {#each players as player}
                    <div class="w-full sm:w-1/2 md:w-1/4 p-2">
                        <Card user={player} />
                    </div>
                {/each}
            </div>
        </div>

        <div class="my-6">
            <Checkbox data={1} label={'enable platform filter?'} />
            <br />
            <Radio name={'platform'} data={'w'} label={'windows'} />
            <Radio name={'platform'} data={'l'} label={'linux'} />
            <Radio name={'platform'} data={'m'} label={'mac'} />
        </div>

        <div class="my-6">
            <h3 class="text-xl">categories:</h3>
            <div class="flex flex-wrap">
                {#each Object.entries(categories) as [id, label]}
                    <div class="w-full sm:w-1/2 md:w-1/4 p-1">
                        <Checkbox data={id} label={label} />
                    </div>
                {/each}
            </div>
        </div>

        <div class="my-6">
            <h2 class="text-2xl">games:</h2>
            <div class="flex flex-wrap">
                {#each games as game}
                    <div class="w-full sm:w-1/2 md:w-1/4 p-2">
                        <Game {game} />
                    </div>
                {/each}
            </div>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
{/if}