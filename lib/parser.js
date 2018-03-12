const showdown = require('showdown');

class Parser {
  constructor(raw) {
    this.raw = raw;
    this.converter = new showdown.Converter();
    this.info = {};
    this.content = '';
    this.errorMsg = '';

    this._SplitHeaderAndContent();
  }

  _SplitHeaderAndContent() {
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
        this.info[name] = value;
      }
    }
  }

  getHtml() {
    if (!this.html) {
      this.html = this.converter.makeHtml(this.content);
      return this.html;
    }
    return this.html;
  }
}

module.exports = Parser;
