const { getLogger } = require('log4js');
const { Res } = require('../utils');
const { EresCode } = require('../../common/enum');
const { getPost } = require('../../service');

const logger = getLogger('/api/article');

module.exports = async (ctx) => {
  logger.trace('in route');
  ctx.body = new Res();

  const { slug } = ctx.query;

  if (!slug) {
    ctx.body.code = EresCode.PARAMETER_ERROR;
    ctx.body.msg = 'Missing \'slug\' parameter.';
    return;
  }

  ctx.body.code = 0;
  const posts = getPost(slug.split(','), ['html']);

  if (!posts || !posts.length) {
    ctx.body.msg = '没有查找到对应的文章';
    ctx.body.data = { posts: [] };
    return;
  }

  ctx.body.msg = 'success';
  ctx.body.data = { posts };
};
