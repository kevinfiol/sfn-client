<script>
    export let user = {
        avatar: '/assets/profile.png',
        personaname: 'User',
        profileurl: 'https://steamcommunity.com',
        steamid: '123'
    };
</script>

<style>
    .card {
        @apply border border-gray-700 max-w-xs rounded break-normal truncate shadow-xl cursor-pointer my-2;
        transition: all 0.1s ease;
    }

    .card:hover {
        @apply bg-gray-800;
    }

    .card:active {
        @apply bg-teal-700 outline-none shadow-outline;
    }

    .card img {
        @apply shadow-lg border-gray-500 border;
    }
</style>

<div class="card">
    <div class="flex flex-wrap px-6 py-4">
        <div class="w-1/3">
            <img class="rounded" src="{user.avatar}" alt="{user.personaname}">
        </div>
        <div class="w-2/3">
            <div class="font-bold text-xl my-2">{user.personaname}</div>
        </div>
    </div>
</div>