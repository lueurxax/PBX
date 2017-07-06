exports.get = async function(ctx, next) {
  if (ctx.req.user) {
    console.log(ctx.req.user);
    ctx.body = { message: 'welcome ' + ctx.req.user.user };
  } else {
    ctx.throw(401, 'access denied');
  }
};
