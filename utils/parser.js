const showdown = require('showdown');
const cheerio = require('cheerio');
const dateFormat = require('dateformat');

/**
 * 解析 markdown
 * info: {
 *  title,
 *  comments,
 *  date,
 *  categories,
 *  tags,
 *  img,
 * }
 */
class Parser {
  constructor(raw) {
    this.raw = raw;
    this.converter = new showdown.Converter();

    this.info = {
      title: '',
      comments: false,
      date: '',
      categories: '',
      tags: '',
      img: '',
    };

    this.brief = '';
    this.content = '';
    this.errorMsg = '';

    this._splitHeaderAndContent();
    this._parseToHtml();
    this._parseToBrief();
    this._formatDate();
  }

  _splitHeaderAndContent() {
    const splited = /(-{3,}(?:\n|\r|.)*?-{3,}?)((?:.|\r|\n)*)/.exec(this.raw);

    if (!splited) throw new Error('Parse header error');

    const [, header, content] = splited;
    this.content = content;

    const result = header.split('\n');
    result.pop();
    result.shift();

    // 匹配出每个 config
    for (let i = 0; i < result.length; i += 1) {
      const regRst = /(\w+?):\s*(.*?)\s*?$/.exec(result[i]);

      if (regRst && regRst[1]) {
        const [, name, value] = regRst;
        this._parseConfigItem(name, value);
      }
    }
  }

  _parseConfigItem(name, value) {
    if (name === 'categories' || name === 'tags') {
      this.info[name] = value.split(' ').filter(item => item.length > 0);
      return;
    }

    this.info[name] = value;
  }

  _parseToHtml() {
    this.html = this.converter.makeHtml(this.content);
  }

  _parseToBrief() {
    const $ = cheerio.load(`${this.html}`);
    const text = $.text().trim().replace(/\n/g, ' ').substr(0, 200);
    this.brief = text;
  }

  _formatDate() {
    this.info.date = dateFormat(this.info.date, 'default');
  }
}

module.exports = Parser;
