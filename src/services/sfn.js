import Request from '../utils/Request.js';
import config from '../../config.js';

const SFN_SERVER_URL = config.services.sfn_server.SFN_SERVER_URL;
const api = endpoint => `${SFN_SERVER_URL}${endpoint}`;

const sfn = {
    async serverWakeup() {
        const endpoint = api('/');
        try {
            await Request.get(endpoint);
        } catch(e) {
            throw e;
        }
    },

    async getAllProfiles(identifier) {
        const endpoint = api(`/user/getAllProfiles/${identifier}`);

        try {
            const response = await Request.get(endpoint);
            const allProfiles = await response.json();
            return allProfiles;
        } catch(e) {
            throw e;
        }
    },

    async getCommonApps(profiles) {
        const endpoint = api(`/user/getCommonApps`);

        try {
            const response = await Request.post(endpoint, { profiles });
            const library = await response.json();
            return library;
        } catch(e) {
            throw e;
        }
    },

    async getLibraryResult(nanoid) {
        const endpoint = api(`/user/getLibraryResult`);

        try {
            const response = await Request.post(endpoint, { nanoid });
            const library = await response.json();
            return library;
        } catch(e) {
            throw e;
        }
    },

    async refreshLibraryResult(nanoid) {
        const endpoint = api(`/user/updateLibraryResult`);

        try {
            const response = await Request.post(endpoint, { nanoid });
            const library = await response.json();
            return library;
        } catch(e) {
            throw e;
        }
    }
};

export default sfn;