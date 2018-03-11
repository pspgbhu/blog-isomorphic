import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => (
  <div className="copyright">
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                <span>Copyright © 2017
                </span> |
                <span>
                  <a className="copyright-links" target="_blank" rel="nofollow" href="http://www.miitbeian.gov.cn/">陕ICP备17007121号</a>
                </span> |
                <span>
                    <a href="//pspgbhu.me" className="copyright-links" rel="nofollow">Pspgbhu's Site</a>
                </span>
            </div>
        </div>
    </div>
</div>
);

Footer.propTypes = {

};

export default Footer;
