const router = require('koa-router')();
const { getPost } = require('../../controllers');

router.get('/post', async (ctx, next) => {
  console.log('--- Dealing with /api/article route');
  const { slug } = ctx.query;
  console.log(slug, typeof slug);

  if (typeof slug !== 'string' && !Array.isArray(slug)) {
    ctx.code = 1;
    ctx.msg = '参数错误';
    await next();
    return;
  }

  ctx.code = 0;
  const posts = getPost(slug);

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
