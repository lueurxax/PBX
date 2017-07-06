/**
 * Created by xax on 03.07.2017.
 */
const QueueMember = require('../../models/queueMember');

const { selectMember } = require('./select');

const updateMembers = async (members, name) => {
  try {
    console.error(members, name);
    const queue = { name };
    const oldMembers = await selectMember(queue);
    const oldMembersName = oldMembers.members.map(member => {
      return member.dataValues.membername;
    });
    const inter = intersection(oldMembersName, members);
    const forInsert = difference(members, inter);
    const forDelete = difference(oldMembersName, inter);
    await Promise.all(forInsert.map(member => {
      return QueueMember.upsert({
        membername: member,
        interface: `SIP/${member}`,
        queue_name: name
      });
    }));
    await Promise.all(forDelete.map(member => {
      return QueueMember.destroy({
        where: {
          membername: member,
          queue_name: name
        }
      });
    }));
    console.log(forInsert, forDelete);
    return queue;
  } catch (err) {
    console.error(err);
    return { err: err };
  }
};

module.exports = { updateMembers };

function intersection(a, b) {
  let c = [];
  a.forEach(x => {
    b.forEach(y => {
      if (x === y) {
        c.push(x);
      }
    });
  });
  return c;
}

function difference(a, b) {
  let c = [];
  a.forEach(x => {
    let i = true;
    b.forEach(y => {
      if (x === y) i = false;
    });
    if (i) c.push(x);
  });
  return c;
}
