const router = require('koa-router')();
const { getPost } = require('../../controllers');

router.get('/article', async (ctx, next) => {
  console.log('--- Dealing with /api/article route');
  const { slug } = ctx.query;

  ctx.code = 0;
  const posts = getPost(slug.split(','));

  if (!posts || !posts.length) {
    ctx.msg = '没有查找到对应的文章';
    ctx.data = { posts };
    await next();
    return;
  }

  ctx.msg = 'success';
  ctx.data = { posts };
  await next();
});

module.exports = router;
