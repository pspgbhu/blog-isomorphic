import { combineReducers } from 'redux';
import article from './article';

export default combineReducers({
  posts: article,
  overviewList(state = []) {
    return state;
  },
  slugList(state = []) {
    return state;
  },
});
