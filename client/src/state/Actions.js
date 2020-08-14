const Actions = ({ _, update }) => ({
    set: (key, val) => update(s => {
        s[key] = val;
        return s;
    }),

    stageFriend: friend => update(s => {
        s.stagedFriends[friend.steamid] = friend;
        return s;
    }),

    unstageFriend: steamid => update(s => {
        delete s.stagedFriends[steamid];
        return s;
    })
});

export default Actions;