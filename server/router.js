const Router = require('koa-router');
const pageCommon = require('./controller/views/common');
const pageArticle = require('./controller/views/article');
const api404 = require('./controller/api/404');
const apiArticle = require('./controller/api/article');
const apiBrief = require('./controller/api/brief');

const router = new Router();

router
  // api router
  .get('/api/article', apiArticle)

  .get('/api/brief', apiBrief)

  .get('/api/*', api404)

  // page router

  .get('*', pageCommon)

  .get('/article/:slug', pageArticle)


; // eslint-disable-line

module.exports = router;
