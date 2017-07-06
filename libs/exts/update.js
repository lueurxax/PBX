/**
 * Created by xax on 29.06.2017.
 */
const Ext = require('../../models/ext');

const update = async (ext) => {
  try {
    await Ext.upsert(ext);
    return await Ext.findAll({
      where: ext,
      attributes: ['id', 'name', 'sippasswd', 'host', 'context',
        'permit', 'deny', 'mailbox', 'nat', 'fromdomain', 'qualify', 'fullname']
    });
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = update;
