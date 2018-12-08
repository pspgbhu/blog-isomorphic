import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => (
  <div className="copyright">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <span>Copyright © 2017-2018
                </span>|
                <span>
            <a href="//pspgbhu.me" className="copyright-links" rel="nofollow">Pspgbhu's Site</a>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          Powered by <a href="https://github.com/pspgbhu/rephic">Rephic</a>
        </div>
      </div>
    </div>
  </div>
);

Footer.propTypes = {

};

export default Footer;
