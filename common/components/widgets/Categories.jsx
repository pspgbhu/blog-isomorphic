import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Widget from '../Widget';

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

const WidgetCate = () => (
  <Widget title="分类" >

  </Widget>
);

export default withRouter(connect(mapStateToProps)(WidgetCate));
