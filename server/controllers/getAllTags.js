/**
 * 获取全部的 tags，排序并去重
 */

module.exports = () => {
  const { posts } = require('../db/db.json');
  const tags = new Set();

  Object.keys(posts).forEach((key) => {
    posts[key].tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
};
