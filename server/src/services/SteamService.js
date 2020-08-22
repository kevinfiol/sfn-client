const Request = require('../utils/Request.js');

const SteamService = {
    init(url) {
        this.url = url;
    },

    async serverWakeup() {
        const endpoint = `${this.url}/app/serverWakeup`;
        try {
            await Request.get(endpoint);
        } catch(e) {
            throw e;
        }
    },

    async getAllSteamCategories() {
        const endpoint = `${this.url}/app/getAllSteamCategories`;

        try {
            const response = await Request.get(endpoint);
            const json = await response.json();
            const categories = Object.entries(json);
            // const categories = Object.entries(json).sort((a, b) => a[1].toUpperCase() > b[1].toUpperCase() ? 1 : -1);
            return categories;
        } catch(e) {
            throw e;
        }
    },

    async getAllProfiles(identifier) {
        const endpoint = `${this.url}/app/getAllProfiles`;

        try {
            const response = await Request.get(endpoint, { steamid: identifier });
            const json = await response.json();
            return json;
        } catch(e) {
            throw e;
        }
    },

    async getCommonApps(steamids) {
        const endpoint = `${this.url}/app/getCommonApps`;

        try {
            const response = await Request.get(endpoint, { steamids });
            const json = await response.json();
            return json;
        } catch(e) {
            throw e;
        }
    }
};

module.exports = SteamService;