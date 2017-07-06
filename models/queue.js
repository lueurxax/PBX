/**
 * Created by xax on 28.06.2017.
 */
const { sequelizeAster } = require('../libs/sequelize');
const Sequelize = require('sequelize');

const Queue = sequelizeAster.define(
  'queue_table', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    strategy: {
      type: Sequelize.STRING,
      defaultValue: 'ringall'
    },
    setinterfacevar: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    ringinuse: Sequelize.BOOLEAN,
    context: {
      type: Sequelize.STRING,
      defaultValue: 'external'
    }
  },
  {
    tableName: 'queue_table',
  }
);

// force: true will drop the table if it already exists

module.exports = Queue;
