import Store from './Store.js';
import Actions from './Actions.js';

const initialState = {
    loading: false,
    loadingMsg: '',
    errorMsg: '',
    stagedFriends: {},
    profiles: null, // Object
    libraryResult: null, // Object
    categories: null // Object
};

const state = Store(initialState);
const actions = Actions(state, initialState);

export { initialState, state, actions };