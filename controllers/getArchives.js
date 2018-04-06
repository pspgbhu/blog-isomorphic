const dateFormat = require('dateformat');

module.exports = () => {
  const arch = new Map();

  global.cache.postsCache.forEach((value) => {
    const key = dateFormat(value.date, 'mmmm yyyy');
    if (arch.has(key)) {
      arch.get(key).number += 1;
      return;
    }
    arch.set(key, {
      date: value.date,
      number: 1,
      timestamp: dateFormat(value.date, new Date(value.date).getTime()),
      link: `/archives/${dateFormat(value.date, 'yyyy/mm')}`,
    });
  });

  const arr = [];
  arch.forEach((value) => {
    arr.push({
      date: value.date,
      number: value.number,
      timestamp: value.timestamp,
      link: value.link,
    });
  });

  return arr.sort((a, b) => b.timestamp - a.timestamp);
};
