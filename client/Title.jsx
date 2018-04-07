import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    const HOME_TITLE = 'Pspgbhu 的博客';
    // 首页
    if (this.props.location.pathname === '/') {
      document.title = HOME_TITLE;
      return;
    }

    const pages = [{
      regExp: new RegExp(/\/article\/([\w-]*)/), // article
      title: (rst) => {
        const { title } = this.props.posts[rst[1]];
        return title ? `${title} | ${HOME_TITLE}` : HOME_TITLE;
      },
    }, {
      regExp: new RegExp(/^\/categories\/([\w-]*)/), // categories
      title: rst => `分类：${rst[1]} | ${HOME_TITLE}`,
    }, {
      regExp: new RegExp(/^\/archives\/(\d+(?:\/\d*))/), // archives
      title: rst => `归档：${rst[1]} | ${HOME_TITLE}`,
    }, {
      regExp: new RegExp(/^\/tags\/([\w-]*)/), // tags
      title: rst => `标签：${rst[1]} | ${HOME_TITLE}`,
    }, {
      regExp: new RegExp(/^\/about/), // about
      title: () => `关于 | ${HOME_TITLE}`,
    }];

    let done = false;
    pages.forEach(({ regExp, title }) => {
      if (done) return;

      const rst = this.props.location.pathname.match(regExp);
      if (!rst) return;

      const tit = title(rst);
      if (tit) {
        document.title = tit;
      }
      done = true;
    });
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
