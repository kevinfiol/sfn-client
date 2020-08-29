<script>
    import { onDestroy } from 'svelte';

    export let msg = '';

    let step = 0;
    let spinner = '/';

    let timer = setInterval(() => {
        console.log('interval');
        if (step === 7) {
            spinner = '|';
            step = 0;
            return;
        }

        if (step === 0 || step === 4)
            spinner = '/';
        if (step === 1 || step === 5)
            spinner = '-';
        if (step === 2 || step === 6)
            spinner = '\\';
        if (step === 3)
            spinner = '|';
        step += 1;
    }, 100);

    onDestroy(() => clearInterval(timer));
</script>

<div class="font-extrabold fixed top-0 right-0 p-2 fade-in">
    <span class="text-3xl">{spinner} </span><span class="text-lg">{msg}</span>
</div>