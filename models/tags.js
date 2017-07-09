/**
 * Created by xax on 09.07.2017.
 */
const { sequelizeAster } = require('../libs/sequelize');
const Sequelize = require('sequelize');

const Tags = sequelizeAster.define('tags',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.STRING
    }
  }
);

module.exports = Tags;

const ExtTags = sequelizeAster.define('ext_tags',
  {
    condition: {
      type: Sequelize.STRING
    },
    tag_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Tags,
        key: 'id'
      }
    }
  }
);

const QueueTags = sequelizeAster.define('queue_tags',
  {
    condition: {
      type: Sequelize.STRING
    },
    tag_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Tags,
        key: 'id'
      }
    }
  }
);

const DidTags = sequelizeAster.define('did_tags',
  {
    name: {
      type: Sequelize.STRING
    },
    tag_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Tags,
        key: 'id'
      }
    }
  }
);

module.exports = { Tags, ExtTags, QueueTags, DidTags };
