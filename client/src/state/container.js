import Store from './Store.js';
import Actions from './Actions.js';

const initialState = {
    steamid: null,
    user: null,
    profiles: null,
    stagedFriends: {}
};

const state = Store(initialState);
const actions = Actions(state);

export { initialState, state, actions };