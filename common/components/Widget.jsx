import React from 'react';
import PropTypes from 'prop-types';

const Aside = ({ children, title }) => (
  <div className="widget">
    <h3 className="title">{title}</h3>
    {children}
  </div>
);

Aside.propTypes = {
  title: PropTypes.string,
};

export default Aside;
