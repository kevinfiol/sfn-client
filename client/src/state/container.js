import Store from './Store.js';
import Actions from './Actions.js';

const initialState = {
    loading: false,
    steamid: null,
    user: null,
    profiles: null,
    stagedFriends: {},
    libraryResult: null,
    categories: null
};

const state = Store(initialState);
const actions = Actions(state, initialState);

export { initialState, state, actions };