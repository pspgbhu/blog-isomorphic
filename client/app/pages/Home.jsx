import React from 'react';
import HomeOvlist from '../containers/HomeOvlist';
import Aside from '../components/Aside';

const Home = () => (
  <div>
    <HomeOvlist />
    <Aside
      categories
      arch
      tags
      social
    />
  </div>
);

export default Home;
