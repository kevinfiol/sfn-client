<script>
    export let name;
    export let label;
    export let data;
</script>

<style>
    label {
        @apply bg-gray-800 rounded truncate;
    }
</style>

<label for="{label}" class="p-1">
    <input type="radio" class="mr-1 leading-tight" {data} id="{label}" name="{name}" >
    <span class="text-sm">{label}</span>
</label>
