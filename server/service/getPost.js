const { getLogger } = require('log4js');

const logger = getLogger('/service/getPost');

/**
 * 获取单篇文章的信息
 *
 * @param {String | String[]} slug 文章名称
 * @param {String[]} keys 需要返回的文章属性值
 */

module.exports = (p, keys = []) => {
  logger.info('param p: %o', p);
  logger.info('param keys: %o', keys);

  const { posts } = require('../db/db.json');

  if (typeof p === 'string') {
    const post = posts[p];
    if (!post) {
      return [];
    }
    return [filterByKeys(post, keys)];
  }

  if (Array.isArray(p)) {
    const rst = p.map((slug) => {
      const post = posts[slug];
      if (!post) {
        return null;
      }
      return filterByKeys(post, keys);
    }).filter(item => item);

    return rst;
  }

  return null;
};

const needEscape = ['html', 'brief'];

function filterByKeys(post, keys) {
  const obj = {};
  keys.push('slug');

  Object.keys(post).forEach((key) => {
    if (keys.indexOf(key) > -1) {
      let value = post[key];

      if (needEscape.indexOf(key) > -1) {
        value = escapeHtml(value);
      }

      obj[key] = value;
    }
  });

  return obj;
}

function escapeHtml(html) {
  if (!html) return html;
  return html
    .replace(/>/g, '&__gt;')
    .replace(/</g, '&__lt;');
}
