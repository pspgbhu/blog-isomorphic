/**
 * 返回全部标签分类
 */
module.exports = () => {
  const cates = new Map();
  // 遍历全部缓存的文章
  global.cache.postsCache.forEach((value) => {
    // 遍历每篇文章的分类
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
