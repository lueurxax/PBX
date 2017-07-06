/**
 * Created by xax on 28.06.2017.
 */
const Queue = require('../../models/queue');
const QueueMember = require('../../models/queueMember');

const select = async () => {
  try {
    return await Queue.findAll({
      attributes: ['name', 'strategy', 'ringinuse', 'context']
    });
  } catch (err) {
    return { err: err };
  }
};
const selectMember = async (queue) => {
  try {
    queue.members = await QueueMember.findAll({
      attributes: ['uniqueid', 'membername', 'penalty', 'paused'],
      where: {
        queue_name: queue.name
      }
    });
    return queue;
  } catch (err) {
    return { err: err };
  }
};

module.exports = { select, selectMember };
