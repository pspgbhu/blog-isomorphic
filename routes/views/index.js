const _ = require('lodash');
const router = require('koa-router')();
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const routeArticle = require('./article');
const renderStaticHtml = require('../../utils/render').default;
const reducers = require('../../common/reducers').default;
const {
  getAllPosts,
  getAllCategories,
  getAllTags,
  getArchives,
  getSlugsOrder,
} = require('../../controllers');
const BLOG_NAME = 'Pspgbhu 的博客';

router.use(routeArticle.routes());

/**
 * 统一处理默认页面
 */
router.get('*', filterPageRoute, serverState, pageTitle, async (ctx) => {
  console.log('--- Dealing with * route'); // eslint-disable-line

  const store = createStore(reducers, ctx.reactState, applyMiddleware(thunk));
  const context = Object.assign({}, ctx.reactContext);
  const content = renderStaticHtml({ ctx, store, context });
  const preloadedState = store.getState();

  await ctx.render('index', {
    title: ctx.title || BLOG_NAME,
    NODE_ENV: process.env.NODE_ENV,
    html: content,
    state: JSON.stringify(preloadedState),
  });
});


/**
 * 生成服务端 redux state
 */
async function serverState(ctx, next) {
  console.log('--- Dealing with serverState router middleware');
  const posts = getAllPosts();

  Object.keys(posts).forEach((key) => {
    delete posts[key].content;
    delete posts[key].html;
  });

  ctx.reactState = _.merge({
    posts,
    tags: getAllTags(),
    archives: getArchives(),
    slugsList: getSlugsOrder(),
    categories: getAllCategories(),
  }, ctx.reactState);

  await next();
}


async function pageTitle(ctx, next) {
  console.log('--- Dealing with title router middleware');
  const rst = decodeURIComponent(ctx.path).match(/^\/(\w+)\/?([^?/#]+)?\/?([^?/#]+)?/);
  if (!rst || !rst[1]) {
    await next();
    return;
  }

  switch (rst[1]) {
    case 'article':
      ctx.title = `${global.cache.postsCache.get(rst[2]).title} | ${BLOG_NAME}`;
      break;
    case 'categories':
      console.log('分类', rst[2]);
      ctx.title = `分类：${rst[2]} | ${BLOG_NAME}`;
      break;
    case 'archives':
      ctx.title = `归档：${rst[2]}${rst[3] ? '/' + rst[3] : ''} | ${BLOG_NAME}`;
      break;
    case 'tags':
      console.log('标签', rst[2]);
      ctx.title = `标签：${rst[2]} | ${BLOG_NAME}`;
      break;
    case '/':
      ctx.title = BLOG_NAME;
      break;
    default:
      ctx.title = BLOG_NAME;
  }

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


module.exports = router;
