const chalk = require('chalk');
const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const webpackDevServer = require('./middlewares/webpackDevServer');
const index = require('./routes');
const { cacheSomeData } = require('./utils');

const app = new Koa();

global.cache = {
  postsCache: new Map(),
  slugsOrder: [],
};

// 异步缓存各种数据
cacheSomeData();

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

// webpackDevServer
if (process.env.NODE_ENV !== 'production') {
  console.log(chalk.yellow('NOTICE: You are running application in development environment!'));
  webpackDevServer(app);
}

app.use(serve(path.join(__dirname, 'public')));

app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'ejs',
  },
  extension: 'ejs',
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
