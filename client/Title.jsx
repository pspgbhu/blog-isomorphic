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

    // 文章
    if (this.props.location.pathname.match(/^\/article\//)) {
      const rst = this.props.location.pathname.match(/\/article\/([\w-]*)/);
      if (!rst || !rst[1]) return;

      const { title } = this.props.posts[rst[1]];

      if (title) {
        document.title = `${title} | Pspgbhu 的博客`;
      }
      return;
    }

    // 分类
    if (this.props.location.pathname.match(/^\/categories\//)) {
      const rst = this.props.location.pathname.match(/\/categories\/([\w-]*)/);
      if (!rst || !rst[1]) return;

      document.title = `分类：${rst[1]} | Pspgbhu 的博客`;
      return;
    }

    // 归档
    if (this.props.location.pathname.match(/^\/archives\//)) {
      const rst = this.props.location.pathname.match(/^\/archives\/(\d+(?:\/\d*))/);
      if (!rst || !rst[1]) return;

      document.title = `归档：${rst[1]} | Pspgbhu 的博客`;
      return;
    }

    // 标签
    if (this.props.location.pathname.match(/^\/tags\//)) {
      const rst = this.props.location.pathname.match(/\/tags\/([\w-]*)/);
      if (!rst || !rst[1]) return;

      document.title = `标签：${rst[1]} | Pspgbhu 的博客`;
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(mapStateToProps)(Title));
