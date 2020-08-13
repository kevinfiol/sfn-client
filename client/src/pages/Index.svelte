<script>
    import TextInput from '../components/TextInput.svelte';
    import Button from '../components/Button.svelte';
    import Card from '../components/Card.svelte';

    import data from '../../tests/data/profiles.json';
    import page from 'page';
    import sfn from '../services/sfn.js';

    export let state;
    export let actions;

    console.log(data);

    let promise;
    let hasFetched = false;
    let identifier = '';
    $: formReady = identifier.trim().length > 0;

    function handleSubmit() {
        hasFetched = true;
        promise = getAllProfiles();
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
</script>

<form on:submit|preventDefault={handleSubmit}>
    <label>enter steamid or alias:</label>
    <TextInput bind:value={identifier} />
    <Button attrs={{ type: 'submit', disabled: !formReady }}>
        get friends
    </Button>
</form>

{#if hasFetched}
    {#await promise}
        <p>waiting...</p>
    {:then}
        <div>
            <h2 class="text-2xl">you are:</h2>
            <Card user={state.user} />

            <h2 class="text-2xl">your friends are:</h2>
            <div class="flex flex-wrap">
                {#each state.profiles.friends as friend}
                    <div class="w-full sm:w-1/2 md:w-1/3 p-2">
                        <Card user={friend} />
                    </div>
                {/each}
            </div>

        </div>
    {:catch error}
        <p class="red">{error.message}</p>
    {/await}
{/if}