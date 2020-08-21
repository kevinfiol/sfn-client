<script>
    export let game;
</script>

<style>
    .card {
        @apply border border-gray-700 max-w-xs rounded break-normal truncate shadow-xl  my-2;
        transition: all 0.1s ease;
    }

    .card img {
        @apply shadow-lg border-gray-500 border;
    }
</style>

<div class="card">
    <div class="flex flex-wrap px-6 py-4">
        <div class="w-1/3">
            <img class="rounded" src="{game.header_image}" alt="{game.name}">
        </div>
        <div class="w-2/3">
            <div class="font-bold px-2 my-2">{game.name}</div>
        </div>
    </div>
</div>