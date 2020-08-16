const LibraryResult = require('../models/LibraryResult.js');
const NanoID = require('../utils/NanoID.js');
const { SteamService } = require('../container.js');

exports.getAllSteamCategories = async function(_, res) {
    try {
        const categories = await SteamService.getAllSteamCategories();
        res.send(200, categories);
    } catch(e) {
        throw e;
    }
};

exports.getAllProfiles = async function(req, res) {
    const identifier = req.params.identifier;

    try {
        const profiles = await SteamService.getAllProfiles(identifier);
        res.send(200, profiles);
    } catch(e) {
        throw e;
    }
};

// 76561197978726907/76561197978726907,76561197961592646,76561197962363601,76561197963689509
exports.getCommonApps = async function(req, res) {
    debugger;
    const steamid = req.params.steamid;
    const steamids = req.params.steamids;
    const sortedIds = steamids.split(',').sort().join(',');

    // check if exists
    let libraryResult;
    libraryResult = await LibraryResult.query().findOne({ idString: sortedIds });

    if (libraryResult !== undefined) {
        res.send(200, libraryResult);
    } else {
        let profiles;
        let steamapps;
        const nanoid = NanoID.gen();

        try {
            steamapps = await SteamService.getCommonApps(steamids);
            profiles = {}; // should have this by req.body or request it

            libraryResult = await LibraryResult.query().insertAndFetch({
                nanoid: nanoid,
                idString: sortedIds,
                profiles: JSON.stringify(profiles),
                steamapps: JSON.stringify(steamapps)
            });

            res.send(200, libraryResult);
        } catch(e) {
            throw e;
        }
    }
};

exports.getLibraryResult = async function(req, res) {
    const nanoid = req.params.nanoid;
    
    let libraryResult;

    try {
        libraryResult = await LibraryResult.query().findOne({ nanoid });
    } catch(e) {
        throw e;
    }

    if (libraryResult !== undefined) {
        res.send(200, libraryResult);
    } else {
        res.send(200, { error: 'ID not found.' });
    }
};