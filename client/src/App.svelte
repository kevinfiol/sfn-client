<script>
    // deps
    import Tailwind from './Tailwind.svelte';
    import router from 'page';

    // components
    import Spinner from './components/Spinner.svelte';

    // pages
    import Layout from './Layout.svelte';
    import Index from './pages/Index.svelte';
    import Friends from './pages/Friends.svelte';
    import Library from './pages/Library.svelte';

    // state
    import { state, actions } from './state/container.js';
    state.subscribe(console.log);

    // router
    let page;
    let params;

    router('/', () => page = Index);
    router('/friends', () => page = Friends);
    router('/lib/:id',
        (ctx, next) => {
            params = ctx.params;
            next();
        }, 
        () => page = Library
    );

    router.start();
</script>

{#if $state.loading}
    <Spinner />
{/if}

<Layout>
    <svelte:component this={page} params={params} {state} {actions} />
</Layout>