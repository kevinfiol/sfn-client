<script>
    import Tailwind from './Tailwind.svelte';
    import router from 'page';

    import Layout from './Layout.svelte';
    import Index from './pages/Index.svelte';
    import Friends from './pages/Friends.svelte';

    let page;
    let params;

    router('/', () => page = Index);
    router('/friends', () => page = Friends);

    router.start();
</script>

<Layout>
    <svelte:component this={page} params={params || null} />
</Layout>