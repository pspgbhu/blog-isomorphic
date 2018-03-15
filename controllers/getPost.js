/**
 * 获取单篇文章的信息
 * @param {String} slug 文件名，不用包含后缀
 */
module.exports = (p) => {
  if (typeof p === 'string') {
    return [
      {
        slug: p,
        html: escapeHtml(global.cache.postsCache.get(p).html),
      },
    ];
  }

  if (Array.isArray(p)) {
    return p.map(slug => (
      { slug, html: escapeHtml(global.cahce.postsCache.get(slug).html) }
    ));
  }

  return null;
};

function escapeHtml(html) {
  return html
    .replace(/>/g, '&gt')
    .replace(/</g, '&lt');
}
