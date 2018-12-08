const { slugList } = require('../common/utils');

module.exports = async () => {
  const list = await slugList();
  return list;
};
