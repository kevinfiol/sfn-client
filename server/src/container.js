import config from '../config.js';
import { Model } from '../orm.js';

import SteamService from './services/SteamService.js';
SteamService.init(config.services.steam_service.url);

export { Model, SteamService };