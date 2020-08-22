<script>
    export let game;

    let platformText = Object.entries(game.platforms)
        .reduce((acc, cur) => {
            // cur[0] windows, cur[1] true/false
            if (cur[1])
                return acc === '' ? cur[0] : `${acc} / ${cur[0]}`;
            else
                return acc;
        }, '')
    ;
</script>

<style>
    .card {
        @apply border border-gray-700 max-w-sm rounded overflow-hidden shadow-xl my-2 min-h-full;
        transition: all 0.1s ease;
    }

    .card:hover {
        @apply bg-gray-800;
    }

    .card:active {
        @apply bg-teal-700 outline-none shadow-outline;
    }

    .card img {
        @apply w-full;
    }

    .title {
        @apply font-bold text-lg mb-2;
    }

    .platforms {
        @apply opacity-50;
    }
</style>

<a href="{`https://store.steampowered.com/app/${game.steam_appid}`}">
    <div class="card" title={game.name}>
        <img src="{game.header_image}" alt="{game.name}">
        <div class="px-6 py-4">
            <h2 class="title">
                {game.name}
            </h2>

            <small class="platforms">
                {platformText}
            </small>
        </div>
    </div>
</a>