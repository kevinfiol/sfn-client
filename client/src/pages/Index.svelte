<script>
    import { onMount }  from 'svelte';
    // import data from '../../tests/data/profiles.json';
    import page from 'page';
    import sfn from '../services/sfn.js';

    import TextInput from '../components/TextInput.svelte';
    import Button from '../components/Button.svelte';

    export let actions;

    let identifier = '';
    $: formReady = identifier.trim().length > 0;

    onMount(async () => {
        actions.clear();
    });

    async function getAllProfiles() {
        if (!formReady) return;

        actions.error();
        actions.set('loading', true);
        actions.set('loadingMsg', 'getting profiles');

        try {
            const data = await sfn.getAllProfiles(identifier);
            console.log(data);
            // const profiles = await Promise.resolve(data);
            if (data.error) throw new Error(data.message);

            actions.set('profiles', data);
            actions.set('loading', false);
            page('/friends');
        } catch(e) {
            actions.set('loading', false);
            actions.error('could not retrieve profiles');
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