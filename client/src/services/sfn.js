import Request from '../utils/Request.js';

const url = 'http://localhost:8080';

const sfn = {
    async getAllProfiles(identifier) {
        const endpoint = `${url}/user/getAllProfiles/${identifier}`;
        console.log(endpoint);
        try {
            const response = await Request.get(endpoint);
            const allProfiles = await response.json();
            console.log(response, allProfiles);
            return allProfiles;
        } catch(e) {
            throw e;
        }
    },

    async getCommonApps(profiles) {
        const endpoint = `${url}/user/getCommonApps`;
        console.log(endpoint);
        try {
            const response = await Request.post(endpoint, { profiles });
            const library = await response.json();
            console.log(library);
            return library;
        } catch(e) {
            throw e;
        }
    }
};

export default sfn;