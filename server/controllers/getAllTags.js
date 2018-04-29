module.exports = () => {
  const tags = new Set();

  global.cache.postsCache.forEach((value) => {
    value.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
};
