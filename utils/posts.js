const path = require('path');
const fs = require('fs');
const util = require('util');
const Parser = require('../lib/parser');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

/**
 * 读取文件并解析 markdown
 * @returns 返回解析结果
 */
exports.readFileAndParse = async (slug) => {
  let raw;

  try {
    raw = await readFile(path.join('posts', `${slug}.md`), { encoding: 'UTF-8' });
  } catch (error) {
    return null;
  }

  const parse = new Parser(raw);
  const info = Object.assign({
    content: parse.content,
    html: parse.html,
    brief: parse.brief,
  }, parse.info);

  return info;
};


/**
 * 缓存一篇文章到内存
 */
exports.cachePost = ({ slug, info }) => {
  global.postsCache.set(slug, info);
};


/**
 * 缓存全部的文章
 */
exports.cacheAllPosts = async () => {
  const slugs = await exports.slugList();

  await Promise.all(slugs.map(async (slug) => {
    const info = await exports.readFileAndParse(slug);
    if (info) {
      exports.cachePost({ slug, info });
    }
  }));
};


/**
 * @returns 返回 /posts/*.md 的文件列表数组
 */
exports.slugList = async () => {
  const mds = await readdir('posts');
  const slugs = mds.map((md) => {
    const rst = /(.*)\.md$/.exec(md);
    if (!rst) { return null; }
    const [, slug] = rst;
    return slug;
  }).filter(slug => slug !== null);

  return slugs;
};
