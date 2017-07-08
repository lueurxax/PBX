/**
 * Created by xax on 08.07.2017.
 */
/**
 * Created by xax on 29.06.2017.
 */
const Queue = require('../../models/queue');
const QueueMember = require('../../models/queueMember');

const update = async (queue) => {
  try {
    return await Queue.upsert(queue);
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = update;
