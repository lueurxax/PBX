// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('config');

const path = require('path');
const fs = require('fs');

app.keys = [config.get('secret')];

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

handlers.forEach(handler => require('./middlewares/' + handler).init(app));

// ---------------------------------------

// can be split into files too
const Router = require('koa-router');

const router = new Router();
router.get('/', require('./routes/frontpage').get);
router.get('/users', require('./routes/users').get);
router.get('/exts', require('./routes/exts').get);
router.patch('/exts', require('./routes/exts').patch);
router.patch('/queues/members', require('./routes/queuemembers').patch);
router.delete('/exts', require('./routes/exts').delete);
router.delete('/users', require('./routes/users').delete);
router.get('/queues', require('./routes/queues').get);
router.post('/login', require('./routes/login').post);
router.post('/signup', require('./routes/signup').post);

app.use(router.routes());

app.listen(3000);
