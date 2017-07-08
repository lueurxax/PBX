/**
 * Created by xax on 28.06.2017.
 */
const { select, selectMember, updateMembers, update, del } = require('../libs/queues');

exports.get = async function(ctx, next) {
  if (ctx.req.user.isAdmin) {
    try {
      const queues = await select();
      ctx.body = await Promise.all(queues.map(queue => {
        return selectMember(queue.dataValues);
      }));
    } catch (err) {
      console.error(err);
      ctx.throw(500, err);
    }
  } else {
    console.log('access denied');
    ctx.throw(401, 'access denied');
  }
};

exports.patch = async function(ctx, next) {
  if (ctx.req.user.isAdmin) {
    try {
      let queue = ctx.request.body.values;
      await updateMembers(queue.agents, queue.name);
      delete queue.agents;
      console.log(queue);
      await update(queue);
      ctx.body = 'success';
    } catch (err) {
      console.error(err);
      ctx.throw(500, err);
    }
  } else {
    console.log('access denied');
    ctx.throw(401, 'access denied');
  }
};

exports.delete = async function(ctx, next) {
  console.log(ctx.request.body);
  if (ctx.req.user.isAdmin) {
    try {
      await del(ctx.request.body.name);
      ctx.body = 'success';
    } catch (err) {
      console.error(err);
      ctx.throw(500, err);
    }
  }
};
