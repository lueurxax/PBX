/**
 * Created by xax on 27.05.2017.
 */
let passport = require('koa-passport');
const User = require('../../models/user');
const config = require('config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
passport.use(new JwtStrategy(jwtOptions, async function(payload, done) {
  // See if the user ID in the payload exist in our database
  // If it dows, call 'done' with that other
  // otherwise, call done without a user object
  // console.log('payload', payload.id);
  try {
    const user = await User.findOne({
      attributes: ['id', 'user', 'isAdmin'],
      where: {
        id: payload.id
      }
    });
    if (user) {
      done(null, user.get({
        plain: true
      }));
    } else {
      done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));
