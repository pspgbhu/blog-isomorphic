const router = require('koa-router')();
const { getOnePost } = require('../../controllers');

router.get('/article', async (ctx, next) => {
  const { slug } = ctx.query;
  let post;

  try {
    post = await getOnePost(slug);
  } catch (error) {
    ctx.code = 1;
    ctx.msg = '查询文章异常';

    await next();
    return;
  }

  ctx.code = 0;

  if (!post) {
    ctx.msg = '没有查找到对应的文章';
    ctx.data = { slug };
    await next();
    return;
  }

  delete post.content;
  delete post.brief;
  ctx.msg = 'success';
  ctx.data = { post, slug };
  await next();
});

module.exports = router;
