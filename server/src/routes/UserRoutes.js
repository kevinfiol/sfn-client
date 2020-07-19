import express from 'express';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();
router.get('/getAllProfiles/:identifier', UserController.getAllProfiles);

export default router;