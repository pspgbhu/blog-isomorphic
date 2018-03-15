const router = require('koa-router')();
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const routeArticle = require('./article');
const routeHome = require('./home');
const renderStaticHtml = require('../../utils/render').default;
const reducers = require('../../common/reducers').default;
const {
  getSlugList,
  getOverviews,
  getAllCategories,
  getArchives,
  getAllTags,
} = require('../../controllers');

router.use(routeArticle.routes());
router.use(routeHome.routes());


/**
 * 统一处理默认页面
 */
router.get('*', filterPageRoute, serverState, async (ctx) => {
  console.log('--- Dealing with * route'); // eslint-disable-line

  const store = createStore(reducers, ctx.reactState, applyMiddleware(thunk));
  const context = Object.assign({}, ctx.reactContext);
  const content = renderStaticHtml({ ctx, store, context });
  const preloadedState = store.getState();

  await ctx.render('index', {
    title: ctx.reactTitle || 'Pspgbhu 的博客',
    NODE_ENV: process.env.NODE_ENV,
    html: content,
    state: JSON.stringify(preloadedState),
  });
});


/**
 * 生成服务端 redux state
 */
async function serverState(ctx, next) {
  ctx.reactState = Object.assign({
    overviewList: getOverviews(),
    slugList: await getSlugList(),
    categories: getAllCategories(),
    archives: getArchives(),
    tags: getAllTags(),
  }, ctx.reactState);

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
