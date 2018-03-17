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

export const p = {};
