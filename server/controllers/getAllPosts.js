
module.exports = () => {
  const posts = {};
  global.cache.postsCache.forEach((value, key) => {
    posts[key] = JSON.parse(JSON.stringify(value));
  });
  return posts;
};
