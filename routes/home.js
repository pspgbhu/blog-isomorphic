const router = require('koa-router')();
const { getOverviews } = require('../controllers');

router.get('/', async (ctx, next) => {
  console.log('--- Dealing with HOME route');  // eslint-disable-line

  ctx.reactState = Object.assign({
    overviewList: await getOverviews(),
  }, ctx.reactState);

  await next();
});

module.exports = router;
