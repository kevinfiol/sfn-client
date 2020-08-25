const Actions = ({ set, update }, initialState) => ({
    clear: () => set(initialState),

    set: (key, val) => update({
        [key]: val
    }),

    stageFriend: friend => update({
        stagedFriends: { [friend.steamid]: friend }
    }),

    unstageFriend: steamid => update({
        stagedFriends: { [steamid]: undefined }
    })
});

export default Actions;