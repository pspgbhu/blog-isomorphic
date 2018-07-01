const { isNumber } = require('../../utils/type');
const EresCode = require('./EresCode');
const EresMsg = require('./EresMsg');

module.exports = class Res {
  constructor(body) {
    this.code = (body && isNumber(body.code)) ? body.code : EresCode.UNKONWN_ERROR;
    this.msg = (body && body.msg) || EresMsg.UNKONWN_ERROR;
    this.data = (body && body.data) || null;
  }
};
