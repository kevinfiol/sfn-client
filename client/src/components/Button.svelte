<script>
    export let onclick = undefined;
    export let attrs;
</script>

<style>
    button {
        @apply bg-transparent shadow-md border border-gray-700 text-gray-300 font-semibold my-2 py-2 px-4 rounded;
        transition: all 0.1s ease;
    }

    button:hover {
        @apply bg-gray-800;
    }

    button:focus, button:active {
        @apply bg-teal-700 outline-none shadow-outline;
    }

    button:disabled {
        @apply text-gray-700 border-gray-700;
    }
</style>

<button {...attrs} on:click={onclick || null}>
    <slot></slot>
</button>