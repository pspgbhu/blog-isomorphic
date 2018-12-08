import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({
  posts,
  archives: createReducer([]),
  tags: createReducer([]),
  categories: createReducer([]),
  slugsList: createReducer([]),
});


function createReducer(p) {
  let init;
  switch (Object.prototype.toString.call(p)) {
    case '[object Array]':
      init = [];
      break;
    case '[object String]':
      init = '';
      break;
    default:
      init = {};
      break;
  }

  return function reducer(state = init) {
    return state;
  };
}
