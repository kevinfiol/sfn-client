<script>
    export let label;
    export let checked = undefined;
</script>

<style>
    label {
        @apply bg-gray-800 rounded truncate;
    }
</style>

<label for="{label}" class="p-1">
    <input
        type="checkbox"
        class="mr-1 leading-tight"
        id="{label}"
        name="{label}"
        on:change
        bind:checked={checked}
    >
    <span class="text-sm">{label}</span>
</label>
