/**
 * Created by xax on 28.06.2017.
 */
const _ = require('lodash');
const config = require('config');
const { sequelizeAster } = require('../libs/sequelize');
const Sequelize = require('sequelize');

const Ext = sequelizeAster.define('sipusers', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('defaultuser', val);
      this.setDataValue('fromuser', val);
      this.setDataValue('name', val);
    }
  },
  ipaddr: Sequelize.STRING,
  port: Sequelize.INTEGER,
  regseconds: Sequelize.INTEGER,
  defaultuser: {
    type: Sequelize.STRING,
  },
  fromuser: Sequelize.STRING,
  sippasswd: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  host: Sequelize.STRING,
  context: {
    type: Sequelize.STRING,
    defaultValue: 'internal'
  },
  permit: Sequelize.STRING,
  deny: Sequelize.STRING,
  mailbox: Sequelize.STRING,
  fromdomain: {
    type: Sequelize.STRING,
    defaultValue: 'call.dssl'
  },
  qualify: {
    type: Sequelize.STRING,
    defaultValue: '1800'
  },
  nat: Sequelize.STRING,
  fullname: Sequelize.STRING
},
  {
    getterMethods: {
      ext() {
        return this.name;
      }
    },
    setterMethods: {
      ext(value) {
        this.setDataValue('name', value);
        this.setDataValue('defaultuser', value);
        this.setDataValue('fromuser', value);
      }
    }
  }
);

// force: true will drop the table if it already exists

module.exports = Ext;
