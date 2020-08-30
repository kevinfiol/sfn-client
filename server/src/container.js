const config = require('../config.js');
const { Model, knex } = require('../orm.js');

const SteamService = require('./services/SteamService.js');
SteamService.init(config.services.steam_service.url);

module.exports = { Model, knex, SteamService };