<script>
    import { scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { onMount }  from 'svelte';

    import sfn from '../services/sfn.js';
    import Alert from '../components/Alert.svelte';
    import Button from '../components/Button.svelte';
    import UserCard from '../components/UserCard.svelte';
    import Game from '../components/Game.svelte';
    import Checkbox from '../components/Checkbox.svelte';
    import Radio from '../components/Radio.svelte';

    export let params;
    export let state;
    export let actions;

    let [baseUrl, hashParams] = window.location.href.split('#!');
    let nanoid = params.nanoid || undefined;
    let enablePlatformFilter = false;
    let platform = 'linux';
    let multiplayerCategories = [1, 9, 20, 27, 36, 38];
    let checkedCategories = {};

    if (hashParams) {
        const hashStr = hashParams.split('&');

        const setCategories = str => {
            const categories = str.split(',');
            for (let i = 0; i < categories.length; i++) {
                checkedCategories[categories[i]] = true;
            }
        }

        if (hashStr.length > 1) {
            let [platformStr, categoryStr] = hashStr;

            enablePlatformFilter = true;
            platform = platformStr.split('=')[1];
            setCategories(categoryStr.split('=')[1]);
        } else {
            const [code, value] = hashStr[0].split('=');

            if (code === 'p') {
                enablePlatformFilter = true;
                platform = value;
            } else if (code === 'c') {
                setCategories(value);
            }
        }
    }

    $: showLibraryResult = $state.libraryResult && $state.categories;

    $: checkedCatIds = Object.entries(checkedCategories)
        .reduce((a, c) => c[1] !== false ? [...a, parseInt(c[0])] : a, []);

    $: hash = '#!' + (enablePlatformFilter ? `p=${platform}` : '')
        + (enablePlatformFilter && checkedCatIds.length > 0 ? '&' : '')
        + (checkedCatIds.length > 0 ? 'c=' + checkedCatIds.join(',') : '');

    $: filteredGames = !$state.libraryResult ? [] : $state.libraryResult.steamapps.filter(app => {
        if (enablePlatformFilter)
            return app.platforms[platform];

        if (checkedCatIds.length < 1 || checkedCatIds.length === $state.categories.entries.length);
            return true;

        const categoryChecked = app.categories.find(c => checkedCatIds.includes(c));
        return categoryChecked !== undefined;
    });

    $: {
        // updates url hash for filters
        window.location.href = baseUrl + hash;
    }

    onMount(async () => {
        console.log(window.location.href);
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
            actions.error();
            actions.set('loading', true);
            actions.set('loadingMsg', 'getting libraries');

            if (!$state.libraryResult && !$state.categories) {
                const result = await sfn.getLibraryResult(nanoid);
                actions.set('libraryResult', result.libraryResult);
                actions.set('categories', result.categories);
            }

            checkedCategories = { ...$state.categories.boolMap, ...checkedCategories};
            console.log(checkedCategories);
            actions.set('loading', false);
        } catch(e) {
            actions.set('loading', false);
            actions.error('could not retrieve library result. URL may be invalid.')
        }
    }

    async function refreshLibraryResult() {
        try {
            actions.error();
            actions.set('loading', true);
            actions.set('loadingMsg', 'refreshing libraries');

            const result = await sfn.refreshLibraryResult(nanoid);
            actions.set('libraryResult', result.libraryResult);
            actions.set('categories', result.categories);

            actions.set('loading', false);
        } catch(e) {
            actions.set('loading', false);
            actions.error('could not refresh library. maybe try again in a bit?')
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
                    <Alert>
                        <h1>no games found</h1>
                    </Alert>
                {/if}
            </div>
        </div>
    </div>
{/if}