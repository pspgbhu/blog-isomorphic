const router = require('koa-router')();
const { getLogger } = require('log4js');
const article = require('./article');
const brief = require('./brief');

const logger = getLogger('/api/index');

router.prefix('/api');

router.use(article.routes());
router.use(brief.routes());

router.get('*', async (ctx) => {
  logger.trace('in route');
  ctx.status = 404;
});


module.exports = router;
