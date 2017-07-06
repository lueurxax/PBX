/**
 * Created by xax on 28.05.2017.
 */
const passport = require('../libs/passport');
exports.init = app => app.use(async (ctx, next) => {
  if (ctx.method !== 'POST' || ctx.url !== '/login') {
    await passport.authenticate('jwt', { session: false }, async function(err, user) {
      if (err) console.log('Error: ', err);
      // await ctx.login(user);
      ctx.req.user = user; // await ctx.login(user, {session: false}); хотя ваш вариант короче :)
    })(ctx, next);
  } else {
    ctx.req.user = '';
  }
  await next();
});
