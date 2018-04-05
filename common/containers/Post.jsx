import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostCom from '../components/Post';
import { fetchArticle } from '../actions/fetchArticle';
import PostPlaceHolder from '../components/PostPlaceHolder';
import Comments from '../components/Comments';

function mapStateToProps(state, props) {
  if (state.posts && state.posts[props.match.params.slug]) {
    const post = state.posts[props.match.params.slug];
    return {
      title: post.title,
      categories: post.categories,
      tags: post.tags,
      date: post.date,
      html: post.html,
      slug: props.match.params.slug,
    };
  }

  return {
    title: '',
    categories: [],
    tags: [],
    date: '',
    html: '',
    slug: '',
  };
}


class Post extends Component {
  componentWillMount() {
    this.props.dispatch(fetchArticle(this.props.match.params.slug));
  }

  render() {
    const {
      title, categories, tags, date, html, slug,
    } = this.props;

    if (html) {
      return (
        <main className="col-md-9 main-content m-post">
          <PostCom
            title={title}
            categories={categories}
            tags={tags}
            date={date}
            html={html}
            slug={slug}
            didMount={this.highlight.bind(this)}
          />
          <Comments slug={slug}/>
        </main>
      );
    }

    return <PostPlaceHolder />;
  }

  highlight() {
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightBlock(block);
      });
      return;
    }

    this.downloadHL(() => {
      window.hljs.initHighlighting();
    });
  }

  downloadHL(cb) {
    const script = document.createElement('script');
    script.src = '//static.pspgbhu.me/common/highlight.pack.js';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '//static.pspgbhu.me/common/googlecode/googlecode.min.css';

    document.body.appendChild(link);
    document.body.appendChild(script);
    script.onload = () => {
      if (cb) {
        cb();
      }
    };
  }
}


export default withRouter(connect(mapStateToProps)(Post));
