const _ = require('lodash');
const router = require('koa-router')();
const { getAllPosts } = require('../../controllers');

router.prefix('/article');

router.get('/:slug', async (ctx, next) => {
  console.log('--- Dealing with /article/:title route');  // eslint-disable-line
  const { slug } = ctx.params;
  const posts = getAllPosts();

  Object.keys(posts).forEach((key) => {
    delete posts[key].content;
    if (key !== slug) {
      delete posts[key].html;
    }
  });

  ctx.reactState = _.merge({
    posts,
  }, ctx.reactState);

  await next();
});

module.exports = router;
