<script>
    export let label;
    export let checked = undefined;
</script>

<label class={`checkbox-btn p-1 rounded truncate ${checked ? 'bg-teal-700' : 'bg-gray-800'}`} for="{label}">
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
