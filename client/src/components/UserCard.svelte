<script>
    export let user = {
        avatar: '/assets/profile.png',
        personaname: 'User',
        profileurl: 'https://steamcommunity.com',
        steamid: '123'
    };

    export let selected = false;
    export let selectable = false;
    export let disabled = false;
</script>

<style>
    .card {
        @apply border border-gray-700 max-w-xs rounded break-normal truncate shadow-xl  my-2;
        transition: all 0.1s ease;
    }

    .card.selectable {
        @apply cursor-pointer;
    }

    .card.disabled {
        @apply opacity-25;
    }

    .card.selectable:hover {
        @apply bg-gray-800;
    }

    .card.selectable:active, .card.selected {
        @apply bg-teal-700 outline-none shadow-outline;
    }

    .card img {
        @apply shadow-lg border-gray-500 border;
    }
</style>

<div
    class="card"
    class:disabled={disabled}
    class:selectable={selectable}
    class:selected={selected}
    on:click
>
    <div class="flex flex-wrap px-6 py-4">
        <div class="w-1/3">
            <img class="rounded" src="{user.avatar}" alt="{user.personaname}">
        </div>
        <div class="w-2/3">
            <div class="font-bold text-xl px-2 my-2">{user.personaname}</div>
        </div>
    </div>
</div>