/**
 * Created by xax on 30.06.2017.
 */
const User = require('../../models/user');

const del = async (id) => {
  try {
    return await User.destroy({
      where: id
    });
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = del;
