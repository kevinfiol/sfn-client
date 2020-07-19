import express from 'express';
import * as IndexController from '../controllers/IndexController.js';

const router = express.Router();
router.get('/', IndexController.serverWakeup);

export default router;