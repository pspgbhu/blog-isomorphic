const _ = require('lodash');
const router = require('koa-router')();
const { getAllPosts, getSlugsOrdered } = require('../../service');

router.prefix('/article');

router.get('/:slug', async (ctx, next) => {
  console.log('--- Dealing with /article/:title route');  // eslint-disable-line
  const { slug } = ctx.params;

  const STAY_BRIEF_NUMBER = 5;
  const posts = getAllPosts();
  const slugsList = getSlugsOrdered();

  // cut some props unnecessary
  slugsList.forEach((key, index) => {
    delete posts[key].content;

    // keep this article's html
    if (key !== slug) {
      delete posts[key].html;
    }

    // only keep a few brief that render in first scene
    if (index >= STAY_BRIEF_NUMBER) {
      delete posts[key].brief;
    }
  });

  ctx.reactState = _.merge({
    posts,
  }, ctx.reactState);

  await next();
});

module.exports = router;
