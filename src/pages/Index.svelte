<script>
    import { onMount }  from 'svelte';
    import page from 'page';
    import sfn from '../services/sfn.js';

    import TextInput from '../components/TextInput.svelte';
    import Button from '../components/Button.svelte';

    export let actions;

    let identifier = '';
    $: formReady = identifier.trim().length > 0;

    // wakeup steam service
    sfn.serverWakeup();

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

<form class="sfn-form" on:submit|preventDefault={getAllProfiles}>
    <TextInput bind:value={identifier} placeholder={'enter your steamid or alias...'} />
    <Button attrs={{ type: 'submit', disabled: !formReady }}>
        get friends
    </Button>
</form>

<div class="sfn-description text-center my-6">
    <h3>compare game libraries with friends ✓</h3>
    <h3>filter by platform or category ✓</h3>
    <h3>figure out what game to play tonight ✓</h3>
    <p>(p.s. make sure your profile is set to <a class="underline" href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401">public</a>)</p>
</div>