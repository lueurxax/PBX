/**
 * Created by xax on 28.05.2017.
 */
const config = require('config');
const jwt = require('jsonwebtoken');
module.exports = function generateToken(payload) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
    if (token) {
      resolve(token);
    } else {
      reject('can\'t generate token');
    }
  });
};
