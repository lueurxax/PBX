
const passport = require('koa-passport');
const config = require('config');
const generateToken = require('../libs/generateToken');
const otp = require('otplib').default;

exports.post = async function(ctx, next) {
  // console.log(ctx.request.body);
  // @see node_modules/koa-passport/lib/framework/koa.js for passport.authenticate
  // it returns the middleware to delegate
  await passport.authenticate('local', async (err, user, info) => {
    console.log(!user);
    if (err) {
      ctx.throw(500, err);
    } else if (!user) {
      ctx.throw(401, 'Нет такого пользователя');
    } else if (!otp.authenticator.check(ctx.request.body.code, user.get('secret'))) {
      ctx.throw(401, 'Не верный код Google Authenticator');
    } else {
      try {
        const payload = {
          id: user.get('id'),
          displayName: user.get('user')
        };
        const token = await generateToken(payload);
        ctx.body = { user: user.get('user'), token: token };
      } catch (err) {
        ctx.throw(401, 'access denied');
      }
    }
  })(ctx, next);
};
