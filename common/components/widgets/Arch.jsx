import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatdate } from '../../utils';
import Widget from '../Widget';

function mapStateToProps(state) {
  return {
    archives: state.archives,
  };
}

const WidgetArch = ({ archives }) => (
  <Widget title="归档">
    <ul className="archive-list">
      { archives && archives.map(({ date, number, link }) => (
        <li className="archive-list-item" key={date}>
          <Link to={link} className="archive-list-link">
            <i className="fa" aria-hidden="true">{formatdate(date, 'yyyy年 mm', 'zh')}</i>
          </Link>
          <span className="archive-list-count">{number}</span>
        </li>
      ))}
    </ul>
  </Widget>
);


export default withRouter(connect(mapStateToProps)(WidgetArch));
