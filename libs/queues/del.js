/**
 * Created by xax on 08.07.2017.
 */
const Queue = require('../../models/queue');
const QueueMember = require('../../models/queueMember');

const del = async (name) => {
  try {
    await QueueMember.destroy({
      where: {
        queue_name: name
      }
    });
    return await Queue.destroy({
      where: { name }
    });
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = del;
