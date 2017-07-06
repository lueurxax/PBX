const passport = require('koa-passport');

require('./jwtStrategy');

require('./localStrategy');

module.exports = passport;
