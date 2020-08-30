<script>
    export let value = '';
</script>

<style>
    input {
        @apply bg-gray-900 shadow-md appearance-none border border-gray-700 rounded w-full my-2 py-2 px-3 leading-tight;
        transition: all 0.1s ease;
    }

    input:focus {
        @apply outline-none shadow-outline;
    }
</style>

<input type="text" bind:value={value}>