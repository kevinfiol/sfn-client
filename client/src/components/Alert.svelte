<script>
    import { scale } from 'svelte/transition';

    export let message;
</script>

<div
    class="bg-darken p-5 w-full rounded"
    in:scale
    out:scale
>
    <slot></slot>
</div>