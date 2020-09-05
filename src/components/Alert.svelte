<script>
    import { scale } from 'svelte/transition';
</script>

<div
    class="bg-darken p-5 w-full rounded"
    in:scale
    out:scale
>
    <slot></slot>
</div>