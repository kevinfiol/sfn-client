import { writable } from 'svelte/store';
import Actions from './Actions.js';

const initialState = {
    steamid: null,
    user: null,
    profiles: null,
    stagedFriends: {}
};

let state;
const store = writable(initialState);
state = store;
// store.subscribe(currentState => state = currentState);

const actions = Actions(store);

export { initialState, state, actions };