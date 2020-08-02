import polka from 'polka';
import * as UserController from '../controllers/UserController.js';

const router = polka();
router.get('/getAllSteamCategories', UserController.getAllSteamCategories);
router.get('/getAllProfiles/:identifier', UserController.getAllProfiles);
router.get('/getLibraryResult/:nanoid', UserController.getLibraryResult);
router.post('/getCommonApps/:steamid/:steamids', UserController.getCommonApps);

export default router;