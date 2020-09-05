<script>
    import { onMount }  from 'svelte';
    import { scale } from 'svelte/transition';
    import page from 'page';
    import sfn from '../services/sfn.js';

    import Alert from '../components/Alert.svelte';
    import TextInput from '../components/TextInput.svelte';
    import Button from '../components/Button.svelte';
    import UserCard from '../components/UserCard.svelte';

    export let state;
    export let actions;

    let selectedCount = 0;
    let friendNameFilter = '';
    $: showFriends = $state.profiles !== null;
    $: filteredFriends = !($state.profiles && $state.profiles.friends)
        ? []
        : $state.profiles.friends.filter(f => f.personaname.toUpperCase().includes(friendNameFilter.toUpperCase().trim()))
    ;

    onMount(async () => {
        if (!$state.profiles)
            page('/');
    });

    function stageFriend(friend) {
        actions.stageFriend(friend);
    }

    function unstageFriend(steamid) {
        actions.unstageFriend(steamid);
    }

    async function getCommonApps() {
        const steamids = [
            $state.profiles.user.steamid,
            ...Object.values($state.stagedFriends).map(f => f.steamid)
        ];

        const profiles = {
            steamids: steamids,
            players: [
                $state.profiles.user,
                ...$state.profiles.friends.filter(f => steamids.includes(f.steamid))
            ]
        };

        try {
            actions.error();
            actions.set('loading', true);
            actions.set('loadingMsg', 'getting libraries');

            const data = await sfn.getCommonApps(profiles);
            actions.set('loading', false);

            actions.set('libraryResult', data.libraryResult);
            actions.set('categories', data.categories);
            page(`/lib/${data.libraryResult.nanoid}`);
        } catch(e) {
            actions.set('loading', false);
            actions.error('could not retrieve libraries.');
        }
    }
</script>

{#if showFriends}
    <div class="my-6">
        <h2>you:</h2>
        <UserCard user={$state.profiles.user} />
    </div>

    <div class="my-8">
        <h2>select your friends and
            <span class="text-base mx-1">
                <Button on:click={ getCommonApps } attrs={{ disabled: Object.keys($state.stagedFriends).length < 1 }}>
                    click here to find games
                </Button>
            </span>
        </h2>

        <TextInput bind:value={friendNameFilter} placeholder={'filter by name...'} />

        <div class="flex flex-wrap">
            {#each filteredFriends as friend (friend.steamid)}
                <div class="w-full sm:w-1/2 md:w-1/3 p-2">
                    <UserCard
                        user={friend}
                        disabled={!friend.visible || (selectedCount >= 5 && !(friend.steamid in $state.stagedFriends))}
                        selected={friend.steamid in $state.stagedFriends}
                        selectable={friend.visible && (selectedCount < 5 || (friend.steamid in $state.stagedFriends))}
                        on:click={() => {
                            if (friend.steamid in $state.stagedFriends) {
                                unstageFriend(friend.steamid);
                                selectedCount -= 1;
                            } else if (selectedCount < 5 && friend.visible) {
                                stageFriend(friend);
                                selectedCount += 1;
                            }
                        }}
                    />
                </div>
            {/each}
            {#if filteredFriends.length < 1}
                <div class="my-4">
                    <Alert>
                        <h1>no friends found</h1>
                    </Alert>
                </div>
            {/if}
        </div>
    </div>
{/if}