import express from 'express';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();
router.get('/getAllSteamCategories', UserController.getAllSteamCategories);
router.get('/getAllProfiles/:identifier', UserController.getAllProfiles);
router.get('/getLibraryResult/:nanoid', UserController.getLibraryResult);
router.post('/getCommonApps/:steamid/:steamids', UserController.getCommonApps);

export default router;