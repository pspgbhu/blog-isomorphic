export const formatdate = (date, format, locale) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const _month = d.getMonth() + 1;
  const day = d.getDate();
  let month = '';

  const localeType = {
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  };

  if (locale in localeType) {
    month = localeType[locale][_month - 1];
  } else {
    month = _month < 10 ? '0' + _month : _month;
  }

  return format
    .replace('yyyy', year)
    .replace('mm', month)
    .replace('dd', day < 10 ? '0' + day : day);
};


export const getTitle = (pathname, { postsCache }) => {
  const HOME_TITLE = 'Pspgbhu 的博客';

  /**
   * url: /blog.pspgbhu.me/artilce/demo/other
   * rst[1] === 'artilce'
   * rst[2] === 'demo'
   * rst[3] === 'other'
   */
  const rst = decodeURIComponent(pathname).match(/^\/(\w+)\/?([^?/#]+)?\/?([^?/#]+)?/);

  if (!rst || !rst[1]) {
    return HOME_TITLE;
  }

  let article;

  switch (rst[1]) {
    case 'article':
      if (!rst[2]) return HOME_TITLE;
      if (Object.prototype.toString.call(postsCache) === '[object Map]') {
        article = postsCache.get(rst[2]);
      } else {
        article = postsCache[rst[2]];
      }
      if (!article || !article.title) return HOME_TITLE;

      return `${article.title} | ${HOME_TITLE}`;

    case 'categories':
      return `分类${rst[2] ? `：${rst[2]}` : ' '} | ${HOME_TITLE}`;

    case 'archives':
      if (!rst[2]) {
        return `归档 | ${HOME_TITLE}`;
      }
      return `归档：${rst[2]}${rst[3] ? '/' + rst[3] : ''} | ${HOME_TITLE}`;

    case 'tags':
      return `标签${rst[2] ? `：${rst[2]}` : ' '} | ${HOME_TITLE}`;

    case 'about':
      return `关于 | ${HOME_TITLE}`;

    case '/':
      return HOME_TITLE;

    default:
      return HOME_TITLE;
  }
};
