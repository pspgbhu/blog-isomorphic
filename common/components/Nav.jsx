import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import className from 'classnames';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnavShow: false,
    };
  }

  render() {
    const { mnavShow } = this.state;
    const { navList } = this.props;
    return (
      <nav className="main-navigation">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="navbar-header">
                <span
                  className="nav-toggle-button collapsed"
                  data-toggle="collapse"
                  data-target="#main-menu"
                  onClick={() => {
                    this.setState({ mnavShow: !this.state.mnavShow });
                  }}
                >
                <span className="sr-only">Toggle navigation</span>
                <i className="fa fa-bars"></i>
              </span>
              </div>
              <div
                className={className('collapse', 'navbar-collapse', { in: mnavShow })}
                id="main-menu"
              >
                <ul className="menu">
                  { navList.map(item => (
                    <li role="presentation" key={item.link}>
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  navList: PropTypes.array.isRequired,
};

export default Nav;
