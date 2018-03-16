import React from 'react';
import HomeOvlist from '../containers/HomeOvlist';
import Aside from '../components/Aside';

const Home = () => (
  <div>
    <HomeOvlist />
    <Aside
      social
      categories
      arch
      tags
    />
  </div>
);

export default Home;
