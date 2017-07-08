/**
 * Created by xax on 08.07.2017.
 */
const updateMembers = require('./updateMembers');
const del = require('./del');
const { select, selectMember } = require('./select');
const update = require('./update');

module.exports = { updateMembers, del, select, update, selectMember };
