const _ = require('lodash');
const compose = require('koa-compose');
const { getLogger } = require('log4js');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { renderToString, reducer, utils } = require('../../../client/app/entry/server');
const {
  getAllPosts,
  getAllCategories,
  getAllTags,
  getArchives,
  getSlugsOrdered,
} = require('../../service');

const { getTitle } = utils;
const logger = getLogger('/routes/views/index');
const HOME_TITLE = 'Pspgbhu 的博客';

/**
 * 统一处理默认页面
 */

async function renderPage(ctx) {
  logger.trace('in * route');

  const store = createStore(reducer, ctx.reactState, applyMiddleware(thunk));
  const context = Object.assign({}, ctx.reactContext);
  const content = renderToString({ ctx, store, context });
  const preloadedState = store.getState();

  await ctx.render('index', {
    title: ctx.title || HOME_TITLE,
    NODE_ENV: process.env.NODE_ENV,
    html: content,
    state: JSON.stringify(preloadedState),
  });
}

/**
 * 生成服务端 redux state
 */

async function serverState(ctx, next) {
  logger.trace('in serverState route');

  const STAY_BRIEF_NUMBER = 5;
  const posts = getAllPosts();
  const slugsList = getSlugsOrdered();

  // cut some props unnecessary
  slugsList.forEach((key, index) => {
    delete posts[key].content;
    delete posts[key].html;
    // only keep a few brief that render in first scene
    if (index >= STAY_BRIEF_NUMBER) {
      delete posts[key].brief;
    }
  });

  ctx.reactState = _.merge({
    posts,
    slugsList,
    tags: getAllTags(),
    archives: getArchives(),
    categories: getAllCategories(),
  }, ctx.reactState);

  await next();
}


async function pageTitle(ctx, next) {
  console.log('--- Dealing with title router middleware');
  const { posts } = require('../../db/db.json');
  const rst = decodeURIComponent(ctx.path).match(/^\/(\w+)\/?([^?/#]+)?\/?([^?/#]+)?/);

  ctx.title = getTitle(ctx.path, { posts });

  await next();
}

/**
 * 将那些不属于页面地址的链接过滤出去，不进行路由处理。
 */
async function filterPageRoute(ctx, next) {
  // .xxx 结尾的不是 React 路由路径
  if (ctx.path.match(/\.\w*$/)) {
    return;
  }
  await next();
}

module.exports = compose([
  filterPageRoute,
  serverState,
  pageTitle,
  renderPage,
]);
