import React from 'react';
import Aside from '../components/Aside';
import Post from '../components/Post';

const Article = () => (
  <div>
    <Post/>
    <Aside
      search
      social
      categories
      arch
      tags
    />
  </div>
);

export default Article;
