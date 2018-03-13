import React from 'react';
import Ovlist from '../containers/Ovlist';
import Aside from '../components/Aside';

const Home = () => (
  <div>
    <Ovlist />
    <Aside
      search
      social
      cate
      arch
      tags
    />
  </div>
);

export default Home;
