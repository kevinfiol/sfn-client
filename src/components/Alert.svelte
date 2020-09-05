<script>
    import { scale } from 'svelte/transition';
</script>

<div
    class="bg-darken p-5 w-full rounded my-4"
    in:scale
    out:scale
>
    <slot></slot>
</div>