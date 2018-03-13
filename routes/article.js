const router = require('koa-router')();
const { getOnePost } = require('../controllers');

router.prefix('/article');

router.get('/:slug', async (ctx, next) => {
  console.log('--- Dealing with /article/:title route');  // eslint-disable-line

  const { slug } = ctx.params;
  const info = await getOnePost(slug);

  if (info) {
    delete info.content;
    delete info.brief;
    ctx.reactState = Object.assign({}, {
      posts: { [slug]: info },
    }, ctx.reactState);
  }

  await next();
});

module.exports = router;
