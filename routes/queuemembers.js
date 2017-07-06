/**
 * Created by xax on 03.07.2017.
 */
const { updateMembers } = require('../libs/queues/updateMembers');

exports.patch = async function(ctx, next) {
  if (ctx.req.user.isAdmin) {
    await updateMembers(ctx.request.body.agents, ctx.request.body.queue);
    ctx.body = 'success';
  } else {
    console.log('access denied');
    ctx.throw(401, 'access denied');
  }
};
