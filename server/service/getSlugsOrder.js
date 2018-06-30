
/**
 * 获取首屏的文章列表数据，并按照时间降序排序。
 * 为了减小数据量，删除掉了 content 和 html 参数
 */

module.exports = () => {
  const { posts } = require('../db/db.json');
  const arr = [];

  Object.keys(posts).forEach((key) => {
    const value = posts[key];
    // 深拷贝文章对象
    const obj = JSON.parse(JSON.stringify(value));
    delete obj.content;
    delete obj.html;
    arr.push(obj);
  });

  arr.sort((a, b) => {
    const adate = new Date(a.date).getTime();
    const bdate = new Date(b.date).getTime();
    return bdate - adate;
  });

  return arr.map(obj => obj.slug);
};
