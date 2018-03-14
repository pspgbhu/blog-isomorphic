import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICEL_ERROR,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_CACHED,
} from '../actions/fetchArticle';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICEL_ERROR:
    case FETCH_ARTICLE_CACHED:
      return state;
    case FETCH_ARTICLE_SUCCESS:
      // return state;
      return Object.assign({}, state, {
        [action.data.slug]: action.data.post,
      });
    default:
      return state;
  }
};
