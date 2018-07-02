import {
  FETCH_POST_REQUEST,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_CACHED,
} from '../actions/fetchArticle';
import {
  FETCH_BRIEF_REQUEST,
  FETCH_BRIEF_ERROR,
  FETCH_BRIEF_SUCCESS,
  FETCH_BRIEF_CACHED,
} from '../actions/fetchBrief';

export default (state = {}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case FETCH_POST_REQUEST:
    case FETCH_POST_ERROR:
    case FETCH_POST_CACHED:
      return state;
    case FETCH_POST_SUCCESS:
      action.data.forEach((post) => {
        newState[post.slug].html = descapeHtml(post.html);
      });
      return newState;

    case FETCH_BRIEF_REQUEST:
    case FETCH_BRIEF_ERROR:
    case FETCH_BRIEF_CACHED:
      return state;
    case FETCH_BRIEF_SUCCESS:
      action.data.forEach((post) => {
        newState[post.slug].brief = descapeHtml(post.brief);
      });
      return newState;

    default:
      return state;
  }
};


function descapeHtml(source) {
  return source
    .replace(/&__gt;/g, '>')
    .replace(/&__lt;/g, '<');
}
