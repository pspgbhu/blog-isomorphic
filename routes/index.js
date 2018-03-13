const router = require('koa-router')();
const { createStore } = require('redux');
const routerArticle = require('./article');
const renderStaticHtml = require('../utils/render').default;
const { getOverviews, getSlugList } = require('../controllers');

router.use(routerArticle.routes());

/**
 * 统一处理默认页面
 */
router.get('*', filterPageRoute, async (ctx) => {
  console.log('--- Dealing with * route'); // eslint-disable-line

  const serverState = {
    slugList: await getSlugList(),
    overviewList: await getOverviews(),
  };

  console.log('[serverState]:', serverState);

  const store = ctx.reactStore || createStore(state => state, serverState);
  const context = ctx.reactContext || {};
  const content = ctx.reactContent || renderStaticHtml({ ctx, store, context });

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
