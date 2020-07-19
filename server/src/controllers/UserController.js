import { SteamService } from '../container.js';

export async function getAllProfiles(req, res) {
    const identifier = req.params.identifier;

    try {
        const profiles = await SteamService.getAllProfiles(identifier);
        res.json(profiles);
    } catch(e) {
        throw e;
    }
}