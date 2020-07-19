import nanoid from 'nanoid';

NANOID_LENGTH = 15;

const NanoID = {
    gen() {
        return nanoid(NANOID_LENGTH);
    }
};

export default NanoID;