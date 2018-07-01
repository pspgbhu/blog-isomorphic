const router = require('koa-router')();
const { getPost } = require('../../service');
const { Res, EresCode, EresMsg } = require('../utils');
const { getLogger } = require('log4js');

const logger = getLogger('/api/brief');

router.get('/brief', async (ctx, next) => {
  logger.trace('in route');
  ctx.body = new Res();

  const { slug } = ctx.query;
  if (!slug) {
    ctx.body.code = EresCode.PARAMETER_ERROR;
    ctx.body.msg = 'Missing \'brief\' parameter';
    return;
  }

  ctx.body.code = 0;
  const posts = getPost(slug.split(','), ['brief']);

  logger.info('getPost %o', posts);

  if (!posts || !posts.length) {
    ctx.body.msg = '没有查找到对应的文章';
    ctx.body.data = { posts: [] };
    return;
  }

  ctx.body.msg = 'success';
  ctx.body.data = { posts };
});

module.exports = router;
