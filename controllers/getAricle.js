const path = require('path');
const { readFileSync } = require('fs');

module.exports = (title) => {
  let raw = '';
  try {
    raw = readFileSync(path.join('posts', `${title}.md`), { encoding: 'UTF-8' });
  } catch (error) {
    raw = error;
  }
};
