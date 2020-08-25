<script>
    import { onMount }  from 'svelte';
    import sfn from '../services/sfn.js';
    import UserCard from '../components/UserCard.svelte';
    import Game from '../components/Game.svelte';
    import Checkbox from '../components/Checkbox.svelte';
    import Radio from '../components/Radio.svelte';

    export let params;
    export let state;
    export let actions;

    let id = params.id || undefined;
    let games = [];
    let players;
    let categories;
    let enablePlatformFilter = false;
    let platform = '';
    let selectedCategories = [];

    $: filteredGames = games.filter(game => {
        if (enablePlatformFilter && platform !== '' && platform !== undefined)
            return game.platforms[platform];

        if (selectedCategories.length < 1 || selectedCategories.length === categories.length)
            return true;

        const categoryChecked = game.categories.find(c => selectedCategories.includes(c));
        return categoryChecked !== undefined;
    });

    onMount(async () => {
        getLibraryResult();
    });

    function onCategoryCheck({ target }, id) {
        id = parseInt(id);

        if (target.checked)
            selectedCategories = [...selectedCategories, parseInt(id)];
        else
            selectedCategories = selectedCategories.filter(c => c !== id);
    }

    async function getLibraryResult() {
        try {
            let result;

            actions.set('loading', true);
            if ($state.libraryResult && $state.categories) {
                result = await Promise.resolve({
                    libraryResult: $state.libraryResult,
                    categories: $state.categories
                });
            } else {
                result = await sfn.getLibraryResult(id);
            }
            actions.set('loading', false);

            games = result.libraryResult.steamapps;
            players = result.libraryResult.profiles.players;
            categories = result.categories;
        } catch(e) {
            actions.set('loading', false);
            throw e;
        }
    }
</script>

{#if players && categories}
    <div>
        <div class="my-6">
            <h2 class="text-2xl">showing library intersection of:</h2>
            <div class="flex flex-wrap">
                {#each players as player}
                    <div class="w-full sm:w-1/2 md:w-1/4 p-2">
                        <UserCard user={player} />
                    </div>
                {/each}
            </div>
        </div>

        <div class="my-6">
            <Checkbox label={'enable platform filter?'} bind:checked={enablePlatformFilter} />
            <br />
            <Radio bind:group={platform} name={'platform'} label={'windows'} disabled={!enablePlatformFilter} />
            <Radio bind:group={platform} name={'platform'} label={'linux'} disabled={!enablePlatformFilter} />
            <Radio bind:group={platform} name={'platform'} label={'mac'} disabled={!enablePlatformFilter} />
        </div>

        <div class="my-6">
            <h3 class="text-xl">categories:</h3>
            <div class="flex flex-wrap">
                {#each categories as [id, label]}
                    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-1">
                        <Checkbox
                            data={id}
                            label={label}
                            on:change={e => onCategoryCheck(e, id)}
                        />
                    </div>
                {/each}
            </div>
        </div>

        <div class="my-6">
            <h2 class="text-2xl">{filteredGames.length} games:</h2>
            <div class="flex flex-wrap">
                {#each filteredGames as game (game.steam_appid)}
                    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <Game {game} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}