<script>
    // deps
    import Tailwind from './Tailwind.svelte';
    import router from 'page';

    // pages
    import Layout from './Layout.svelte';
    import Index from './pages/Index.svelte';
    import Library from './pages/Library.svelte';

    // state
    import { state, actions } from './state/container.js';
    state.subscribe(console.log);
    // router
    let page;
    let params;

    router('/', () => page = Index);
    router('/lib', () => page = Library);

    router.start();
</script>

<Layout>
    <svelte:component this={page} params={params || null} {state} {actions} />
</Layout>