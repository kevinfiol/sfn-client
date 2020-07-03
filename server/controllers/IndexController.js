import Responder from '../utils/Responder.js';
import { SteamService } from '../container.js';

const IndexController = {
    async serverWakeup(ctx) {
        const response = {};

        try {
            await SteamService.serverWakeup();
            response['message'] = 'OK';
        } catch(e) {
            console.log(e);
            response['message'] = 'steam-serv did not respond.';
        }

        Responder.json(ctx, response);
    }
}

export default IndexController; 