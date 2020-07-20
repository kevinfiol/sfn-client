import LibraryResult from '../models/LibraryResult.js';
import NanoID from '../utils/NanoID.js';
import { SteamService } from '../container.js';

export async function getAllSteamCategories(req, res) {
    try {
        const categories = await SteamService.getAllSteamCategories();
        res.json(categories);
    } catch(e) {
        throw e;
    }
}

export async function getAllProfiles(req, res) {
    const identifier = req.params.identifier;

    try {
        const profiles = await SteamService.getAllProfiles(identifier);
        res.json(profiles);
    } catch(e) {
        throw e;
    }
}

// export async function getGamePage(req, res) {
//     const id = req.params.id;
    // const sortedIds = steamids.split(',').sort().join(',');

    // let libraryResult = await LibraryResult.query().findOne({ idString: sortedIds });
    
    // if (libraryResult !== undefined) {
    //     // use it
    // } else {
    //     const newResultId = NanoID.gen();

    //     try {
    //         const commonApps = await SteamService.getCommonApps(steamids);
    //         libraryResult = await LibraryResult.query().insert({
    //             nanoid: newResultId,
    //             idString: sortedIds,

    //         });
    //     } catch(e) {
    //         throw e;
    //     }

// }

export async function getCommonApps(req, res) {
    const steamid = req.params.steamid;
    const steamids = req.params.steamids;

    const sortedIds = steamids.split(',').sort().join(',');

    // check if exists
    let libraryResult;
    libraryResult = await LibraryResult.query().findOne({ idString: sortedIds });

    if (libraryResult !== undefined) {
        res.json(libraryResult);
    } else {
        let profiles;
        let steamapps;
        const nanoid = NanoID.gen();

        try {
            steamapps = await SteamService.getCommonApps(steamids);
            profiles = {}; // should have this by req.body or request it

            libraryResult = await LibraryResult.query().insert({
                nanoid: nanoid,
                idString: steamids,
                profiles: profiles,
                steamapps: steamapps
            });

            res.json(libraryResult);
        } catch(e) {
            throw e;
        }
    }
}

export async function getLibraryResult(req, res) {
    const nanoid = req.params.nanoid;
    
    let libraryResult;

    try {
        libraryResult = await LibraryResult.query().findOne({ nanoid });
    } catch(e) {
        throw e;
    }

    if (libraryResult !== undefined) {
        res.json(libraryResult);
    } else {
        res.json({ error: 'ID not found.' });
    }
}