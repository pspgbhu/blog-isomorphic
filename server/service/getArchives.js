const dateFormat = require('dateformat');

/**
 * 获取归档信息。按照日期来归档。
 */

module.exports = () => {
  const { posts } = require('../db/db.json');
  const arch = new Map();

  Object.keys(posts).forEach((key) => {
    const value = posts[key];
    const formatdate = dateFormat(value.date, 'mmmm yyyy');
    if (arch.has(formatdate)) {
      arch.get(formatdate).number += 1;
      return;
    }
    arch.set(formatdate, {
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
