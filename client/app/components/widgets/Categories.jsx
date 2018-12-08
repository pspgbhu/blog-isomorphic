import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Widget from '../Widget';

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

const WidgetCate = ({ categories }) => (
  <Widget title="分类" >
    <ul className="category-list">
      {categories && categories.map(item => (
        <li className="category-list-item" key={item.category}>
          <Link to={`/categories/${item.category}/`} className="category-list-link">
            <i className="fa" aria-hidden="true">{item.category}</i>
          </Link>
          <span className="category-list-count">{item.number}</span>
        </li>
      ))}
    </ul>
  </Widget>
);

export default withRouter(connect(mapStateToProps)(WidgetCate));
