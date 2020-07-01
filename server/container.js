import config from './config.js';

import SteamService from './services/SteamService.js';
SteamService.init(config.services.steam_service.url);

import { Database } from './deps.js';
const database = new Database(config.database.dialect, config.database.options);

export { SteamService, database };