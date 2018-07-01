const { isNumber } = require('../utils/type');
const { Res, EresCode, EresMsg } = require('../routes/utils');

module.exports = () => async (ctx, next) => {
  await next();

  // if (!/^\/api/.test(ctx.url)) {
  //   return;
  // }

  // if (!ctx.body) {
  //   ctx.body = new Res();
  // }

  // const { code, msg, data } = ctx.body;
  // ctx.body = {
  //   code: isNumber(code) ? code : EresCode.UNKONWN_ERROR,
  //   msg: msg || 'The request was not processed!',
  //   data: data || null,
  // };
};
