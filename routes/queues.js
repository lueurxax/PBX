/**
 * Created by xax on 28.06.2017.
 */
const { select, selectMember } = require('../libs/queues/select');

exports.get = async function(ctx, next) {
  if (ctx.req.user.isAdmin) {
    const queues = await select();
    ctx.body = await Promise.all(queues.map(queue => {
      return selectMember(queue.dataValues);
    }));
  } else {
    console.log('access denied');
    ctx.throw(401, 'access denied');
  }
};

