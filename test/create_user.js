/**
 * Created by xax on 05.07.2017.
 */
const { insert } = require("../libs/users/insert");

try {
  insert({ user: 'a.khasanov', password: '12345', isAdmin: true })
    .then(user => console.log(user));
} catch (err) {
  console.error(err);
}
