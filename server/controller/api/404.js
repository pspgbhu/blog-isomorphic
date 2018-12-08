const { getLogger } = require('log4js');

const logger = getLogger('/api/*');

module.exports = async (ctx) => {
  logger.trace('in route');
  ctx.status = 404;
};
