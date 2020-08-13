import { writable } from 'svelte/store';
import Actions from './Actions.js';

const initialState = {
    steamid: null,
    user: null,
    profiles: null
};

let state;
const store = writable(initialState);
store.subscribe(currentState => state = currentState);

const actions = Actions(store);

export { initialState, state, actions };