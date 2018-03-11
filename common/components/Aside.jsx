import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetSearch from './widgets/Search';
import WidgetSocial from './widgets/Social';
import WidgetCate from './widgets/Categories';
import WidgetArch from './widgets/Arch';
import WidgetTags from './widgets/Tags';

function mapStateToProps(state) {
  return {

  };
}

class Aside extends Component {
  render() {
    return (
      <aside className="col-md-4 sidebar">
        <WidgetSearch/>
        <WidgetSocial/>
        <WidgetCate/>
        <WidgetArch/>
        <WidgetTags/>
      </aside>
    );
  }
}


export default connect(mapStateToProps)(Aside);
