/**
 * Created by xax on 08.07.2017.
 */
/**
 * Created by xax on 29.06.2017.
 */
const Queue = require('../../models/queue');

const update = async (queue) => {
  try {
    await Queue.upsert(queue);
    return await Queue.findAll({
      where: queue,
      attributes: ['name', 'strategy', 'ringinuse', 'context']
    });
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = update;
