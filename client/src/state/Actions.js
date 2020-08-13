const Actions = ({ _, update }) => ({
    set: (key, val) => update(s => {
        s[key] = val;
        console.log(s);
        return s;
    })
});

export default Actions;