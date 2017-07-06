/**
 * Created by xax on 28.06.2017.
 */
const User = require('../../models/user');

const select = async () => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'user', 'isAdmin', 'secret']
    });
    return JSON.stringify(users);
  } catch (err) {
    return { err: err };
  }
};

module.exports = select;
