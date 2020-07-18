import { Router } from './deps.js';
import IndexController from './controllers/IndexController.js';
import UserController from './controllers/UserController.js';

const router = new Router()
    // IndexController
    .get('/', IndexController.serverWakeup)

    // UserController
    .get('/user/getAllProfiles/:identifier', UserController.getUser)
;

export default router;