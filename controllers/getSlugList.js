const { slugList } = require('../utils');

module.exports = async () => {
  const list = await slugList();
  return list;
};
