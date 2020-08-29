const { Model } = require('objection');
const Knex = require('knex');
const config = require('./config.js');

const knex = Knex(config.database);
Model.knex(knex);

module.exports = { Model, knex };