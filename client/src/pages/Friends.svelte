<script>
    import { onMount }  from 'svelte';
    import page from 'page';
    import sfn from '../services/sfn.js';

    import Button from '../components/Button.svelte';
    import UserCard from '../components/UserCard.svelte';

    export let state;
    export let actions;

    let selectedCount = 0;

    onMount(async () => {
        if (!$state.profiles || !$state.user || !$state.steamid) {
            console.log('route back', $state);
            page('/');
        }
    });

    function stageFriend(friend) {
        actions.stageFriend(friend);
    }

    function unstageFriend(steamid) {
        actions.unstageFriend(steamid);
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
            actions.set('loading', true);
            const data = await sfn.getCommonApps(profiles);
            actions.set('libraryResult', data.libraryResult);
            actions.set('categories', data.categories);
            actions.set('loading', false);
            page(`/lib/${data.libraryResult.nanoid}`);
        } catch(e) {
            throw e;
            actions.set('loading', false);
        }
    }
</script>

<Button on:click={ getCommonApps }>
    get apps
</Button>

{#if $state.profiles}
    <div class="my-6">
        <h2 class="text-2xl">you:</h2>
        <UserCard user={$state.user} />
    </div>

    <div class="my-8">
        <h2 class="text-2xl">select your friends:</h2>
        <div class="flex flex-wrap">
            {#each $state.profiles.friends as friend}
                <div class="w-full sm:w-1/2 md:w-1/3 p-2">
                    <UserCard
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
{/if}