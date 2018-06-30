
/**
 * 获取单篇文章的信息
 * @param {String} slug 文件名，不用包含后缀
 */

module.exports = (p) => {
  const { posts } = require('../db/db.json');

  if (typeof p === 'string') {
    const post = posts[p];
    if (!post) {
      return [];
    }
    return [
      {
        slug: p,
        html: escapeHtml(post && post.html),
      },
    ];
  }

  if (Array.isArray(p)) {
    const rst = p.map((slug) => {
      const post = posts[slug];
      if (!post) {
        return null;
      }
      return {
        slug,
        html: escapeHtml(post && post.html),
      };
    }).filter(item => item);

    return rst;
  }

  return null;
};


function escapeHtml(html) {
  if (!html) return html;
  return html
    .replace(/>/g, '&__gt;')
    .replace(/</g, '&__lt;');
}
