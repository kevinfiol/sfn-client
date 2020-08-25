<script>
    import { onMount }  from 'svelte';
    import data from '../../tests/data/profiles.json';
    import page from 'page';
    import sfn from '../services/sfn.js';

    import TextInput from '../components/TextInput.svelte';
    import Button from '../components/Button.svelte';

    export let state;
    export let actions;

    let identifier = '';
    $: formReady = identifier.trim().length > 0;

    onMount(async () => {
        actions.clear();
    });

    async function getAllProfiles() {
        if (!formReady) return;

        actions.set('loading', true);
        try {
            const profiles = await Promise.resolve(data);
            // const profiles = await sfn.getAllProfiles(identifier);
            actions.set('profiles', profiles);
            actions.set('user', profiles.user);
            actions.set('steamid', profiles.user.steamid);
            actions.set('loading', false);
            page('/friends');
        } catch(e) {
            actions.set('loading', false);
            throw e;
        }
    }
</script>

<form on:submit|preventDefault={getAllProfiles}>
    <label>enter your steamid or alias:</label>
    <TextInput bind:value={identifier} />
    <Button attrs={{ type: 'submit', disabled: !formReady }}>
        get friends
    </Button>
</form>