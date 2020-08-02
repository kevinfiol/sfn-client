import { SteamService } from '../container.js';

export async function serverWakeup(req, res) {
    const response = {};

    try {
        await SteamService.serverWakeup();
        response['message'] = 'OK';
    } catch(e) {
        console.log(e);
        response['message'] = 'steam-serv did not respond';
    }

    res.send(200, response);
}