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

      // 选择上报 pv 的平台
      this.reportPagePV([
        'baidu',
        'google',
      ]);
    }
  }

  changeTitle() {
    const title = getTitle(
      this.props.location.pathname,
      { posts: this.props.posts },
    );

    document.title = title;
  }

  /**
   * 上报 SPA 的页面跳转
   */
  reportPagePV(analytics) {
    analytics.forEach(item => this.reporters[item], this);
  }

  /**
   * baidu & google SPA analytics
   */
  reporters = {
    baidu() {
      if (window._hmt) {
        window._hmt.push(['_trackPageview', this.props.location.pathname]);
      }
    },

    google() {
      if (window.gtag) {
        window.gtag('config', 'UA-117000274-1', {
          page_path: this.props.location.pathname,
        });
      }
    },
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(mapStateToProps)(Title));
