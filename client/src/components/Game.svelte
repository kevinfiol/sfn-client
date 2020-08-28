<script>
    // import lazyLoad from '../utils/lazyLoad.js';

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

<a href="{`https://store.steampowered.com/app/${game.steam_appid}`}">
    <div class="card" title={game.name}>
        <img src="{game.header_image}" alt="{game.name}">
        <div class="px-6 py-4">
            <h3 class="title">
                {game.name}
            </h3>

            <small class="platforms">
                {platformText}
            </small>
        </div>
    </div>
</a>