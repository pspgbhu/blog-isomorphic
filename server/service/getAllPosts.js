module.exports = () => {
  const { posts } = require('../db/db.json');

  // 深拷贝
  return JSON.parse(JSON.stringify(posts));
};
