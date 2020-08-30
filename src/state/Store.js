import merge from 'mergerino';
import { writable } from 'svelte/store';

const Store = initialState => {
    const { set, update, subscribe } = writable(initialState);

    return {
        set,
        update: patch => update(value => merge(value, patch)),
        subscribe
    };
};

export default Store;