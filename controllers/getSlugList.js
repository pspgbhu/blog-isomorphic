const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const mds = fs.readdirSync('posts');

  const slugs = mds.map((md) => {
    const rst = /(.*)\.md$/.exec(md);
    if (!rst) { return null; }
    const [, slug] = rst;
    return slug;
  }).filter(slug => slug !== null);

  return slugs;
};
