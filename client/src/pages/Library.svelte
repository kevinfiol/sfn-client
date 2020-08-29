<script>
    import { scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { onMount }  from 'svelte';

    import sfn from '../services/sfn.js';
    import Button from '../components/Button.svelte';
    import UserCard from '../components/UserCard.svelte';
    import Game from '../components/Game.svelte';
    import Checkbox from '../components/Checkbox.svelte';
    import Radio from '../components/Radio.svelte';

    export let params;
    export let state;
    export let actions;

    let nanoid = params.nanoid || undefined;
    let enablePlatformFilter = false;
    let platform = 'linux';
    let multiplayerCategories = [1, 9, 20, 27, 36, 38];
    let checkedCategories = {};

    $: showLibraryResult = $state.libraryResult && $state.categories;
    $: checkedCatIds = Object.entries(checkedCategories)
        .reduce((a, c) => c[1] !== false ? [...a, parseInt(c[0])] : a, []);

    $: filteredGames = !$state.libraryResult ? [] : $state.libraryResult.steamapps.filter(app => {
        if (enablePlatformFilter)
            return app.platforms[platform];

        if (checkedCatIds.length < 1 || checkedCatIds.length === $state.categories.entries.length);
            return true;

        const categoryChecked = app.categories.find(c => checkedCatIds.includes(c));
        return categoryChecked !== undefined;
    });

    onMount(async () => {
        getLibraryResult();
    });

    function checkMultiplayerCategories() {
        for (let i = 0; i < multiplayerCategories.length; i++) {
            checkedCategories[multiplayerCategories[i]] = true;
        }
    }

    function uncheckAllCategories() {
        for (const key in checkedCategories) {
            checkedCategories[key] = false;
        }
    }

    async function getLibraryResult() {
        try {
            actions.set('loading', true);
            actions.set('loadingMsg', 'getting libraries');

            if (!$state.libraryResult && !$state.categories) {
                const result = await sfn.getLibraryResult(nanoid);
                actions.set('libraryResult', result.libraryResult);
                actions.set('categories', result.categories);
            }

            checkedCategories = $state.categories.boolMap;
            actions.set('loading', false);
        } catch(e) {
            actions.set('loading', false);
            throw e;
        }
    }

    async function refreshLibraryResult() {
        try {
            actions.set('loading', true);
            actions.set('loadingMsg', 'refreshing libraries');

            const result = await sfn.refreshLibraryResult(nanoid);
            actions.set('libraryResult', result.libraryResult);
            actions.set('categories', result.categories);

            actions.set('loading', false);
        } catch(e) {
            actions.set('loading', false);
            throw e;
        }
    }
</script>

{#if showLibraryResult}
    <div>
        <div class="my-6">
            <h2>showing library intersection of:</h2>
            <div class="flex flex-wrap">
                {#each $state.libraryResult.profiles.players as player}
                    <div class="w-full sm:w-1/2 md:w-1/4 p-2">
                        <UserCard user={player} />
                    </div>
                {/each}
            </div>
        </div>

        <div class="my-6">
            <div class="flex flex-wrap">
                <div class="w-full sm:w-1/2">
                    <Checkbox label={'enable platform filter?'} bind:checked={enablePlatformFilter} />
                    <br />
                    <Radio bind:group={platform} name={'platform'} label={'windows'} disabled={!enablePlatformFilter} />
                    <Radio bind:group={platform} name={'platform'} label={'linux'} disabled={!enablePlatformFilter} />
                    <Radio bind:group={platform} name={'platform'} label={'mac'} disabled={!enablePlatformFilter} />
                </div>
                <div class="w-full sm:w-1/2 text-right">
                    <span>last updated {$state.libraryResult.updated_at} </span>
                    <Button on:click={ refreshLibraryResult }>refresh library?</Button>
                </div>
            </div>

        </div>

        <div class="my-6">
            <h2>categories (inclusive):</h2>
            <Button on:click={ checkMultiplayerCategories }>check online multiplayer games</Button>
            <Button on:click={ uncheckAllCategories }>uncheck all</Button>

            <div class="flex flex-wrap">
                {#each $state.categories.entries as [id, label] (id)}
                    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-1">
                        <Checkbox
                            data={id}
                            label={label}
                            bind:checked={checkedCategories[id]}
                        />
                    </div>
                {/each}
            </div>
        </div>

        <div class="my-6">
            <h2>{filteredGames.length} games:</h2>
            <div class="flex flex-wrap">
                {#each filteredGames as game (game.steam_appid)}
                    <div
                        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                        animate:flip={{duration: 200}}
                        out:scale
                    >
                        <Game {game} />
                    </div>
                {/each}
                {#if filteredGames.length < 1}
                    <div
                        class="bg-darken p-5 w-full rounded"
                        in:scale
                        out:scale
                    >
                        <h1>no games found</h1>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}