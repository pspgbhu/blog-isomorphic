import React from 'react';
import Aside from '../components/Aside';
import OvlistBy from '../containers/OvlistBy';

const Categories = () => (
  <div>
    <OvlistBy by="tags" />
    <Aside
      social
      categories
      arch
      tags
    />
  </div>
);

export default Categories;
