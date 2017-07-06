/**
 * Created by xax on 05.07.2017.
 */
const User = require('../../models/user');

const insert = async (user) => {
  try {
    await User.upsert(user);
    return await User.findAll({
      where: {
        user: user.user
      },
      attributes: ['id', 'user', 'isAdmin']
    });
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = { insert };
