const router = require('koa-router')();

router.prefix('/article');

router.get('/:slug', async (ctx, next) => {
  console.log('--- Dealing with /article/:title route');  // eslint-disable-line

  const regRst = /\/\w+\/(\w)/.exec(ctx.url);
  let content = '';

  if (!regRst) {
    content = '';
  }

  // await ctx.render('index', {
  //   title: 'React Isomorphic',
  //   NODE_ENV: process.env.NODE_ENV,
  //   html: 'asdf',
  //   state: JSON.stringify({ a: 1 }),
  // });
  await next();
});

module.exports = router;
