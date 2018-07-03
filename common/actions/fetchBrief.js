import axios from 'axios';

export const FETCH_BRIEF_REQUEST = 'fetch_brief_requset';
export const FETCH_BRIEF_ERROR = 'fetch_brief_error';
export const FETCH_BRIEF_SUCCESS = 'fetch_brief_success';
export const FETCH_BRIEF_CACHED = 'fetch_brief_cached';

export const fetchBrief = list => (dispatch, getState) => {
  const { posts } = getState();
  const needFetch = [];

  list.forEach((slug) => {
    if (posts[slug] && !posts[slug].brief) {
      needFetch.push(slug);
    }
  });

  if (needFetch.length === 0) {
    dispatch({ type: FETCH_BRIEF_CACHED });
    return Promise.resolve();
  }

  dispatch({ type: FETCH_BRIEF_REQUEST });

  const api = `/api/brief?slug=${needFetch.join(',')}`;
  return new Promise((resolve, reject) => {
    axios.get(api).then(({ data }) => {
      if (data.code !== 0 || !data.data.posts.length) {
        dispatch({ type: FETCH_BRIEF_ERROR, msg: data.msg });
        return reject();
      }
      dispatch({
        type: FETCH_BRIEF_SUCCESS,
        data: data.data.posts,
      });
      resolve();
    }).catch((error) => {
      dispatch({ type: FETCH_BRIEF_ERROR, msg: error });
      reject();
    });
  });
};
