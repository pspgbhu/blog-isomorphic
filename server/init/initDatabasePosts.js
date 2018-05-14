const path = require('path');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const { slugList, readFileAndParse } = require('../utils/posts');
const { getLogger } = require('log4js');

const logger = getLogger('initDatabasePosts');

/**
 * 在每次 node 程序启动的时候，重新更新 db.json 中 posts 字段的内容，
 * 以此来保证文章的新鲜度
 */

module.exports = async () => {
  const adapter = new FileAsync(path.resolve(__dirname, '../db/db.json'));
  const [db, slugs] = await Promise.all([
    low(adapter), // lowdb 实例
    slugList(), // 获取到目录下的 md 文件列表
  ]);

  // 读取全部 markdown 文件
  const posts = {};
  await Promise.all(slugs.map(async (slug) => {
    // 获取一篇文章的信息
    try {
      const postInfo = await readFileAndParse(slug);
      postInfo && (posts[slug] = postInfo);
    } catch (error) {
      logger.error('slug:', slug, error);
    }
  }));

  // 存储在 db.json 的 posts 字段中
  db.set('posts', posts).write();
};
