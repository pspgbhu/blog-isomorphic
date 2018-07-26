const chalk = require('chalk');
const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const serve = require('koa-static');
const { configure } = require('log4js');
const loggerConfig = require('./config/logger');
const index = require('./routes');
const webpackDevServer = require('./middlewares/webpackDevServer');
const apiError = require('./middlewares/apiError');
const log = require('./middlewares/log');

configure(loggerConfig);

// 初始化 db.json 中的 posts 数据
require('./init/initDatabasePosts')();

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

const app = new Koa();

// error handler
onerror(app);

app.use(log());
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(koaLogger());

if (process.env.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, '../node_modules/.cache/rephic/public')));
}

app.use(serve(path.join(__dirname, 'public')));

app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'ejs',
  },
  extension: 'ejs',
}));

app.use(apiError());
app.use(index.routes(), index.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
