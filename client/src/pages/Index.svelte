<script>
    import TextInput from '../components/TextInput.svelte';
    import Button from '../components/Button.svelte';
    import Card from '../components/Card.svelte';

    import data from '../../tests/data/profiles.json';
    import page from 'page';
    import sfn from '../services/sfn.js';

    export let state;
    export let actions;

    let promise;
    let hasFetched = false;
    let identifier = '';
    let selectedCount = 0;

    $: formReady = identifier.trim().length > 0;

    function handleSubmit() {
        hasFetched = true;
        promise = getAllProfiles();
    }

    function stageFriend(friend) {
        actions.stageFriend(friend);
    }

    function unstageFriend(steamid) {
        actions.unstageFriend(steamid);
    }

    async function getAllProfiles() {
        if (!formReady) return;

        try {
            const profiles = await Promise.resolve(data);
            // const profiles = await sfn.getAllProfiles(identifier);
            actions.set('profiles', profiles);
            actions.set('user', profiles.user);
            actions.set('steamid', profiles.user.steamid);
            return profiles;
        } catch(e) {
            throw e;
        }
    }

    async function getCommonApps() {
        const steamids = [
            $state.steamid,
            ...Object.values($state.stagedFriends).map(f => f.steamid)
        ];

        const profiles = {
            steamids: steamids,
            players: [
                $state.user,
                ...$state.profiles.friends.filter(f => steamids.includes(f.steamid))
            ]
        };

        try {
            const data = await sfn.getCommonApps(profiles);
            actions.set('libraryResult', data.libraryResult);
            actions.set('categories', data.categories);
            page(`/lib/${data.libraryResult.nanoid}`);
        } catch(e) {
            throw e;
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <label>enter your steamid or alias:</label>
    <TextInput bind:value={identifier} />
    <Button attrs={{ type: 'submit', disabled: !formReady }}>
        get friends
    </Button>
</form>

<Button on:click={ getCommonApps }>
    get apps
</Button>

{#if hasFetched}
    {#await promise}
        <p>waiting...</p>
    {:then}
        <div class="my-6">
            <h2 class="text-2xl">you:</h2>
            <Card user={$state.user} />
        </div>

        <div class="my-8">
            <h2 class="text-2xl">select your friends:</h2>
            <div class="flex flex-wrap">
                {#each $state.profiles.friends as friend}
                    <div class="w-full sm:w-1/2 md:w-1/3 p-2">
                        <Card
                            user={friend}
                            disabled={selectedCount >= 5 && !(friend.steamid in $state.stagedFriends)}
                            selected={friend.steamid in $state.stagedFriends}
                            selectable={selectedCount < 5 || (friend.steamid in $state.stagedFriends)}
                            on:click={() => {
                                if (friend.steamid in $state.stagedFriends) {
                                    unstageFriend(friend.steamid);
                                    selectedCount -= 1;
                                } else if (selectedCount < 5) {
                                    stageFriend(friend);
                                    selectedCount += 1;
                                }
                            }}
                        />
                    </div>
                {/each}
            </div>
        </div>
    {:catch error}
        <p class="red">{error.message}</p>
    {/await}
{/if}