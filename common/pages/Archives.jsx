import React from 'react';
import ArchivesList from '../containers/ArchivesList';
import Aside from '../components/Aside';

const Archives = () => (
  <div>
    <ArchivesList/>
    <Aside
      categories
      arch
      tags
      social
    />
  </div>
);

export default Archives;
