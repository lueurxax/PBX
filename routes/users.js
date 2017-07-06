/**
 * Created by xax on 28.06.2017.
 */

const config = require('config');
const select = require('../libs/users/select');
const del = require('../libs/users/del');

exports.get = async function(ctx, next) {
  // @see node_modules/koa-passport/lib/framework/koa.js for passport.authenticate
  // it returns the middleware to delegate
  if (ctx.req.user.isAdmin) {
    ctx.body = await select();
  } else {
    console.log('access denied');
    ctx.throw(401, 'access denied');
  }
};

exports.delete = async function(ctx, next) {
  if (ctx.req.user.isAdmin) {
    ctx.body = await del(ctx.request.body);
  } else {
    console.log('access denied');
    ctx.throw(401, 'access denied');
  }
};
