const {
  readFileAndParse,
  slugList,
} = require('./posts');

const {
  cachePost,
  cacheAllPosts,
  cacheOverviews,
  cacheSomeData,
} = require('./cache');


module.exports = {
  readFileAndParse,
  cachePost,
  slugList,

  cacheAllPosts,
  cacheOverviews,
  cacheSomeData,
};
