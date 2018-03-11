import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

const Aside = ({ children, title, cls }) => (
  <div className="widget">
    <h3 className="title">{title}</h3>
    <div className={className(cls)}>
      {children}
    </div>
  </div>
);

Aside.propTypes = {
  title: PropTypes.string,
};

export default Aside;
