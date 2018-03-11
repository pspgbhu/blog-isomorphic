import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const Nav = ({ navList }) => (
  <nav className="main-navigation">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="navbar-header"><span className="nav-toggle-button collapsed" data-toggle="collapse" data-target="#main-menu" id="mnav">
            <span className="sr-only">Toggle navigation</span>
            <i className="fa fa-bars"></i>
          </span>
          </div>
          <div className="collapse navbar-collapse" id="main-menu">
            <ul className="menu">
              <li role="presentation">
                { navList.map(item => (
                  <Link key={item.link} to={item.link}><i className="fa fa-fw"></i>{item.name}</Link>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

Nav.propTypes = {
  navList: PropTypes.array.isRequired,
};

export default Nav;
