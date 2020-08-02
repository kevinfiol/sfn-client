import polka from 'polka';
import * as IndexController from '../controllers/IndexController.js';

const router = polka();
router.get('/', IndexController.serverWakeup);

export default router;