import React from 'react';
import Aside from '../components/Aside';
import Post from '../containers/Post';

const Article = () => (
  <div>
    <Post/>
    <Aside
      categories
      arch
      tags
      social
    />
  </div>
);

export default Article;
