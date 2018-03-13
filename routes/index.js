const router = require('koa-router')();
const { createStore } = require('redux');
const routeArticle = require('./article');
const routeHome = require('./home');
const renderStaticHtml = require('../utils/render').default;
const { getSlugList, getOverviews } = require('../controllers');

router.use(routeArticle.routes());
router.use(routeHome.routes());

/**
 * 统一处理默认页面
 */
router.get('*', filterPageRoute, async (ctx) => {
  console.log('--- Dealing with * route'); // eslint-disable-line

  const serverState = Object.assign({
    overviewList: getOverviews(),
    slugList: await getSlugList(),
  }, ctx.reactState);

  const store = createStore(state => state, serverState);
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
