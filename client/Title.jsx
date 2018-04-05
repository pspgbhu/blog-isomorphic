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
    if (this.props.location !== prevProps.location) {
      this.changeTitle();
    }
  }

  changeTitle() {
    // 首页
    if (this.props.location.pathname === '/') {
      document.title = 'Pspgbhu 的博客';
      return;
    }

    const pages = [{
      regExp: new RegExp(/\/article\/([\w-]*)/), // article
      title: (rst) => {
        const { title } = this.props.posts[rst[1]];
        return title ? `${title} | Pspgbhu 的博客` : 'Pspgbhu 的博客';
      },
    }, {
      regExp: new RegExp(/\/categories\/([\w-]*)/), // categories
      title: rst => `分类：${rst[1]} | Pspgbhu 的博客`,
    }, {
      regExp: new RegExp(/^\/archives\/(\d+(?:\/\d*))/), // archives
      title: rst => `归档：${rst[1]} | Pspgbhu 的博客`,
    }, {
      regExp: new RegExp(/\/tags\/([\w-]*)/), // tags
      title: rst => `标签：${rst[1]} | Pspgbhu 的博客`,
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

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(mapStateToProps)(Title));
