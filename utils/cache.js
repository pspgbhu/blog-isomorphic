const { slugList, readFileAndParse } = require('./posts');


exports.cacheSomeData = async () => {
  await exports.cacheAllPosts();
  exports.cacheSlugsOrder();
};

/**
 * 缓存全部的文章
 */
exports.cacheAllPosts = async () => {
  const slugs = await slugList();
  await Promise.all(slugs.map(async (slug) => {
    const info = await readFileAndParse(slug);
    if (info) {
      exports.cachePost({ slug, info });
    }
  }));
};


/**
 * 缓存首页预览信息
 */
exports.cacheSlugsOrder = () => {
  const arr = [];

  global.cache.postsCache.forEach((value) => {
    const obj = Object.assign({}, value);
    delete obj.content;
    delete obj.html;
    arr.push(obj);
  });

  arr.sort((a, b) => {
    const adate = new Date(a.date).getTime();
    const bdate = new Date(b.date).getTime();
    return bdate - adate;
  });

  global.cache.slugsOrder = arr.map(obj => obj.slug);
};


/**
 * 缓存一篇文章到内存
 */
exports.cachePost = ({ slug, info }) => {
  global.cache.postsCache.set(slug, info);
};
