/**
 * Created by xax on 28.06.2017.
 */
/**
 * Created by xax on 28.06.2017.
 */
const { sequelizeAster } = require('../libs/sequelize');
const Sequelize = require('sequelize');

const QueueMember = sequelizeAster.define(
  'queue_member_table', {
    uniqueid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    membername: Sequelize.STRING,
    queue_name: Sequelize.BOOLEAN,
    interface: Sequelize.BOOLEAN,
    penalty: Sequelize.INTEGER,
    paused: Sequelize.INTEGER
  },
  {
    tableName: 'queue_member_table',
  }
);

// force: true will drop the table if it already exists

module.exports = QueueMember;
