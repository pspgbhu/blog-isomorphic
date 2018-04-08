import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTitle } from '../common/utils';

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

class Title extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {

      this.changeTitle();
      this.reportPagePV();
    }
  }

  changeTitle() {
    const title = getTitle(
      this.props.location.pathname,
      { postsCache: this.props.posts },
    );

    document.title = title;
  }

  reportPagePV() {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', this.props.location.pathname]);
    }
    if (window.gtag) {
      window.gtag('config', 'UA-117000274-1', {
        page_path: this.props.location.pathname,
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(mapStateToProps)(Title));
