const path = require('path');
const fs = require('fs');
const util = require('util');
const Parser = require('../lib/parser');
const dateFormat = require('dateformat');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

/**
 * 读取文件并解析 markdown
 * @returns 返回解析结果
 */
exports.readFileAndParse = async (slug) => {
  let raw;
  let stats;

  try {
    const filename = `${slug}.md`;
    raw = await readFile(path.join('posts', filename), { encoding: 'UTF-8' });
    stats = await stat(path.join('posts', filename));
  } catch (error) {
    return null;
  }

  const parse = new Parser(raw);
  const info = Object.assign({
    date: parse.date || dateFormat(stats.birthtime, 'yyyy-mm-dd HH:MM:SS'),
    content: parse.content,
    html: parse.html,
    brief: parse.brief,
    slug,
  }, parse.info);

  return info;
};

/**
 * @returns 返回 /posts/*.md 的文件列表数组
 */
exports.slugList = async () => {
  const mds = await readdir(path.resolve('../blog-article-backup/_posts'));
  console.log('markdown list:', mds);

  const slugs = mds.map((md) => {
    const rst = /(.*)\.md$/.exec(md);
    if (!rst) { return null; }
    const [, slug] = rst;
    return slug;
  }).filter(slug => slug !== null);

  return slugs;
};
