import {
  FETCH_POST_REQUEST,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_CACHED,
} from '../actions/fetchArticle';

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
    default:
      return state;
  }
};


function descapeHtml(source) {
  return source
    .replace(/&__gt;/g, '>')
    .replace(/&__lt;/g, '<');
}
