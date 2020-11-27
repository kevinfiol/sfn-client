<script>
    // deps
    import router from 'page';
    import Tailwind from './Tailwind.svelte';

    // components
    import Alert from './components/Alert.svelte';
    import Spinner from './components/Spinner.svelte';

    // pages
    import Layout from './Layout.svelte';
    import Index from './pages/Index.svelte';
    import Friends from './pages/Friends.svelte';
    import Library from './pages/Library.svelte';

    // state
    import { state, actions } from './state/container.js';

    // router
    let page;
    let params;

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
    <div class="fixed top-0 right-0">
        <Alert>
            <Spinner msg={$state.loadingMsg} />
        </Alert>
    </div>
{/if}

{#if $state.errorMsg.length > 0}
    <div class="fixed top-0 right-0">
        <Alert>
            <h3>error: {$state.errorMsg}</h3>
        </Alert>
    </div>
{/if}

<Layout>
    <svelte:component this={page} params={params} {state} {actions} />
</Layout>