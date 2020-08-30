const { nanoid } = require('nanoid');

const NANOID_LENGTH = 15;

const NanoID = {
    gen() {
        return nanoid(NANOID_LENGTH);
    }
};

module.exports = NanoID;