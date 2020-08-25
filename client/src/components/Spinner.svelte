<script>
    import { onDestroy } from 'svelte';
    let step = 0;
    let text = '/';

    let timer = setInterval(() => {
        console.log('interval');
        if (step === 7) {
            text = '|';
            step = 0;
            return;
        }

        if (step === 0 || step === 4)
            text = '/';
        if (step === 1 || step === 5)
            text = '-';
        if (step === 2 || step === 6)
            text = '\\';
        if (step === 3)
            text = '|';
        step += 1;
    }, 100);

    onDestroy(() => clearInterval(timer));
</script>

<div class="text-3xl font-extrabold fixed top-0 right-0 p-2">
    {text}
</div>