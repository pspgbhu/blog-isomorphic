const router = require('koa-router')();
const article = require('./article');

router.prefix('/api');

router.use(article.routes());

router.get('*', async (ctx) => {
  const { code, msg, data } = ctx;
  ctx.body = {
    code: code !== undefined ? code : -1,
    msg: msg || 'The request was not processed!',
    data: data || null,
  };
});


module.exports = router;
