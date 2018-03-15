const _ = require('lodash');

const state = {
  posts: {
    react: {
      html: 'asdf',
      number: 1,
    },
  },
};

const a = _.merge({
  posts: {
    react: {
      number: 1,
    },
  },
}, state);

console.log(a);
