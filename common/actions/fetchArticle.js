import axios from 'axios';
import { API_PREFIX } from '../config';

export const FETCH_ARTICLE_REQUEST = 'fetch_article_requeset';
export const FETCH_ARTICLE_ERROR = 'fetch_article_error';
export const FETCH_ARTICLE_SUCCESS = 'fetch_article_success';
export const FETCH_ARTICLE_CACHED = 'fetch_article_cached';

export const fetchArticle = slug => (dispatch, getState) => {
  const { posts } = getState();
  if (posts && posts[slug]) {
    dispatch({ type: FETCH_ARTICLE_CACHED });
    return;
  }

  dispatch({ type: FETCH_ARTICLE_REQUEST });

  if (!slug) {
    dispatch({ type: FETCH_ARTICLE_ERROR, msg: '[Actions -> fetchArticle:] The parameter slug error!' });
  }

  const api = `${API_PREFIX}/article?slug=${slug}`;
  axios.get(api).then(({ data }) => {
    if (data.code !== 0) {
      dispatch({ type: FETCH_ARTICLE_ERROR, msg: data.msg });
      return;
    }
    dispatch({
      type: FETCH_ARTICLE_SUCCESS,
      data: {
        slug,
        post: data.data.post,
      },
    });
  }).catch((error) => {
    dispatch({ type: FETCH_ARTICLE_ERROR, msg: error });
  });
};
