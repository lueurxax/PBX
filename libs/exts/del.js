/**
 * Created by xax on 30.06.2017.
 */
const Ext = require('../../models/ext');

const del = async (id) => {
  try {
    return await Ext.destroy({
      where: id
    });
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = del;
