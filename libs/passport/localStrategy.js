let passport = require('koa-passport');
let LocalStrategy = require('passport-local');
let User = require('../../models/user');
const crypto = require('crypto');
const config = require('config');

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(new LocalStrategy({
  usernameField: 'user', // 'username' by default
  passReqToCallback: true, // req for more complex cases
  session: false },
  // Три возможных итога функции
  // done(null, user[, info]) ->
  //   strategy.success(user, info)
  // done(null, false[, info]) ->
  //   strategy.fail(info)
  // done(err) ->
  //   strategy.error(err)
  async function(req, username, password, done) {
    try {
      const user = await User.findOne({
        where: {
          user: username
        }
      });
      console.log(user);
      const valid = await checkPassword(password, user.get('salt'), user.get('passwordHash'));
      if (!user || !valid) {
        // don't say whether the user exists
        console.log('Нет такого пользователя или пароль неверен.');
        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

function checkPassword(password, salt, passwordHash) {
  return new Promise((resolve, reject) => {
    if (!password) reject(false);
    if (!passwordHash) reject(false);
    resolve(crypto.pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha512')
        .toString('base64') === passwordHash);
  });
}
