/**
 * 返回全部标签分类，并按照名称进行排序
 */

module.exports = () => {
  const { posts } = require('../db/db.json');
  const cates = new Map();

  Object.keys(posts).forEach((key) => {
    const value = posts[key];

    // 收集全部的文章分类，并且记录每个分类下的文章个数
    value.categories.forEach((cate) => {
      if (cates.has(cate)) {
        cates.get(cate).number += 1;
      } else {
        cates.set(cate, { number: 1 });
      }
    });
  });

  const catesArr = [];
  cates.forEach((value, key) => {
    catesArr.push({
      category: key,
      number: value.number,
    });
  });

  return catesArr.sort((a, b) => a.category > b.category);
};
