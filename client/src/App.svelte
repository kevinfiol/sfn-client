<script>
    // deps
    import sfn from './services/sfn.js';
    import router from 'page';
    import Tailwind from './Tailwind.svelte';
    import GlobalStyles from './GlobalStyles.svelte';

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

    // wakeup steam service
    sfn.serverWakeup();

    router('/', () => page = Index);
    router('/friends', () => page = Friends);
    router('/lib/:nanoid',
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