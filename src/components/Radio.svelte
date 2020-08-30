<script>
    export let name;
    export let label;

    export let group = undefined;
    export let disabled = false;
</script>

<label class="p-1 bg-gray-800 rounded truncate" for="{label}">
    <input
        type="radio"
        class="mr-1 leading-tight"
        id="{label}"
        value="{label}"
        name="{name}"
        {disabled}
        bind:group={group}
    >
    <span class="text-sm">{label}</span>
</label>
