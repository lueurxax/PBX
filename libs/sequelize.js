/**
 * Created by xax on 26.06.2017.
 */
const Sequelize = require('sequelize');
const config = require('config');

const params = config.get('mysql');
const sequelizeAster = new Sequelize('asterisk', params.username, params.password, params.options);
const sequelizeAcs = new Sequelize('acs', params.username, params.password, params.options);

module.exports = { sequelizeAster, sequelizeAcs };
