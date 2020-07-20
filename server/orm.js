import { Model } from 'objection';
import Knex from 'knex';
import config from './config.js';

const knex = Knex(config.database);
Model.knex(knex);

export { Model };