import axios from 'axios';

export const FETCH_POST_REQUEST = 'fetch_article_requset';
export const FETCH_POST_ERROR = 'fetch_post_error';
export const FETCH_POST_SUCCESS = 'fetch_post_success';
export const FETCH_POST_CACHED = 'fetch_post_cached';

export const fetchArticle = slug => (dispatch, getState) => {
  const { posts } = getState();

  if (posts && posts[slug] && posts[slug].html) {
    dispatch({ type: FETCH_POST_CACHED });
    return;
  }

  dispatch({ type: FETCH_POST_REQUEST });

  if (!slug) {
    dispatch({ type: FETCH_POST_ERROR, msg: '[Actions -> fetchArticle:] The parameter slug error!' });
  }

  const api = `/api/article?slug=${slug}`;
  axios.get(api).then(({ data }) => {
    if (data.code !== 0 || !data.data.posts.length) {
      dispatch({ type: FETCH_POST_ERROR, msg: data.msg });
      return;
    }
    dispatch({
      type: FETCH_POST_SUCCESS,
      data: data.data.posts,
    });
  }).catch((error) => {
    dispatch({ type: FETCH_POST_ERROR, msg: error });
  });
};
