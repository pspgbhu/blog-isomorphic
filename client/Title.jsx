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
    }

    // // 文章
    // if (this.props.location.pathname.includes('/article/')) {
    //   const rst = this.props.location.pathname.match(/\/article\/([\w-]*)/);
    //   if (!rst || !rst[1]) return;

    //   const { title } = this.props.posts[rst[1]];

    //   if (title) {
    //     document.title = `${title} | Pspgbhu 的博客`;
    //   }
    // }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(connect(mapStateToProps)(Title));
