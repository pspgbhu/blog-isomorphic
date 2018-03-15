const dateFormat = require('dateformat');

dateFormat.i18n.monthNames = [
  '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',
  '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',
];

module.exports = () => {
  const arch = new Map();

  global.cache.postsCache.forEach((value) => {
    const key = dateFormat(value.date, 'mmmm yyyy');
    if (arch.has(key)) {
      arch.get(key).number += 1;
      return;
    }
    arch.set(key, {
      number: 1,
      timestamp: dateFormat(value.date, new Date(value.date).getTime()),
      link: `/archives/${dateFormat(value.date, 'yyyy/mm')}`,
    });
  });

  const arr = [];
  arch.forEach((value, key) => {
    arr.push({
      date: key,
      number: value.number,
      timestamp: value.timestamp,
      link: value.link,
    });
  });

  return arr.sort((a, b) => b.timestamp - a.timestamp);
};
