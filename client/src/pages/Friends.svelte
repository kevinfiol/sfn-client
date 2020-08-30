<script>
    import { onMount }  from 'svelte';
    import page from 'page';
    import sfn from '../services/sfn.js';

    import Button from '../components/Button.svelte';
    import UserCard from '../components/UserCard.svelte';

    export let state;
    export let actions;

    let selectedCount = 0;
    $: showFriends = $state.profiles !== null;

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
            <span class="text-base">
                <Button on:click={ getCommonApps }>
                    click here
                </Button>
            </span>
            to find games.
        </h2>

        <div class="flex flex-wrap">
            {#each $state.profiles.friends as friend (friend.steamid)}
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
        </div>
    </div>
{/if}