const { isNumber } = require('../../common/utils/type');
const { EresCode } = require('../../common/enum');
const EresMsg = require('../../common/enum/EresMsg');

module.exports = class Res {
  constructor(body) {
    this.code = (body && isNumber(body.code)) ? body.code : EresCode.UNKONWN_ERROR;
    this.msg = (body && body.msg) || EresMsg.UNKONWN_ERROR;
    this.data = (body && body.data) || null;
  }
};
