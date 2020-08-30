const polka = require('polka');
const IndexController = require('../controllers/IndexController.js');

const router = polka();
router.get('/', IndexController.serverWakeup);

module.exports = router;