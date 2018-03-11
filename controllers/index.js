const overviews = require('../mock/a.json');

exports.getOverviews = () => new Promise((resolve) => {
  resolve(overviews);
});
