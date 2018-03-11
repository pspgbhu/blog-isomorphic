import React, { Component } from 'react';
import { connect } from 'react-redux';
import Widget from '../Widget';

function mapStateToProps(state) {
  return {

  };
}

class WidgetSearch extends Component {
  render() {
    return (
      <Widget title="搜索">
        <div>
          你好
        </div>
      </Widget>
    );
  }
}

export default connect(mapStateToProps)(WidgetSearch);
