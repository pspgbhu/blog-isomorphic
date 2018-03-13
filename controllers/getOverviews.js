const overviews = require('../mock/a.json');

module.exports = () => new Promise((resolve) => {
  const arr = [];

  global.postsCache.forEach((value) => {
    const obj = Object.assign({}, value);
    delete obj.content;
    delete obj.html;
    arr.push(obj);
  });

  console.log(arr);

  resolve(arr);
});
