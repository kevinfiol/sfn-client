import page from 'page';
import Index from './pages/Index.svelte';
import Friends from './pages/Friends.svelte';

let current;
// let params;

page('/',        () => (current = Index));
page('/friends', () => (current = Friends));

// Start Router
page.start()

export { current };