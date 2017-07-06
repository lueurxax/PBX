/**
 * Created by xax on 28.06.2017.
 */
const Ext = require('../../models/ext');

const select = async () => {
  try {
    const exts = await Ext.findAll({
      attributes: ['id', 'name', 'sippasswd', 'host', 'context',
        'permit', 'deny', 'mailbox', 'nat', 'fromdomain', 'qualify', 'fullname'],
      order: ['name']
    });
    return JSON.stringify(exts);
  } catch (err) {
    return { err: err };
  }
};

module.exports = select;
