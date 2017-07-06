const crypto = require('crypto');
const config = require('config');
const { sequelizeAster } = require('../libs/sequelize');
const Sequelize = require('sequelize');
const otp = require('otplib').default;

const User = sequelizeAster.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: Sequelize.STRING,
  },
  passwordHash: Sequelize.STRING,
  secret: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
  //access: Sequelize.STRING
},
  {
    setterMethods: {
      password(value) {
        if (value) {
          const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
          this.setDataValue('salt', salt);
          this.setDataValue('passwordHash', crypto
            .pbkdf2Sync(value, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha512')
            .toString('base64'));
          this.setDataValue('secret', otp.authenticator.generateSecret());
        } else {
          // remove password (unable to login w/ password any more, but can use providers)
          this.setDataValue('salt', undefined);
          this.setDataValue('passwordHash', undefined);
        }
      }
    }
  }
);

// force: true will drop the table if it already exists

module.exports = User;
