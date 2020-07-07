<script>
    import Tailwind from './Tailwind.svelte';
    import { current } from './routes';
</script>

<nav>
    <a href="/">home</a>
    <a href="/friends">friends</a>
</nav>

<svelte:component this={current} />