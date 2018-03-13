import React from 'react';
import Aside from '../components/Aside';
import Post from '../components/Post';

const Article = () => (
  <div>
    <Post/>
    <Aside
      search
      social
      cate
      arch
      tags
    />
  </div>
);

export default Article;
