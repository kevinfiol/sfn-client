<script>
    import sfn from '../services/sfn.js';

    let identifier = '';
    $: formReady = identifier.trim().length > 0;

    let profiles;

    async function getAllProfiles() {
        if (!formReady) return;

        console.log('getting profiles...');
        profiles = await sfn.getAllProfiles(identifier);
        console.log(profiles);
    }
</script>

<p>put in your steamid or alias</p>

<form on:submit|preventDefault={getAllProfiles}>
    <input bind:value={identifier} type="text">
    <button type="submit" disabled={!formReady}>
        go
    </button>
</form>



<style>
    input { color: black; }
</style>