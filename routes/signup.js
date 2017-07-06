/**
 * Created by xax on 28.05.2017.
 */
const  { insert } = require('../libs/users/insert');

exports.post = async function(ctx, next) {
  console.log(ctx.request.body);
  ctx.body = await insert(ctx.request.body);
};
