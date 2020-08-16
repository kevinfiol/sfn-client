const polka = require('polka');
const UserController = require('../controllers/UserController.js');

const router = polka();
router.get('/getAllSteamCategories', UserController.getAllSteamCategories);
router.get('/getAllProfiles/:identifier', UserController.getAllProfiles);
router.get('/getLibraryResult/:nanoid', UserController.getLibraryResult);
router.post('/getCommonApps', UserController.getCommonApps);

module.exports = router;