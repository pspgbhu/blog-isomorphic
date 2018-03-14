import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostCom from '../components/Post';
import { fetchArticle } from '../actions/fetchArticle';
import PostPlaceHolder from '../components/PostPlaceHolder';

function mapStateToProps(state, props) {
  if (state.posts && state.posts[props.match.params.slug]) {
    const post = state.posts[props.match.params.slug];
    return {
      title: post.title,
      categories: post.categories,
      tags: post.tags,
      date: post.date,
      html: post.html,
    };
  }

  return {
    title: '',
    categories: [],
    tags: [],
    date: '',
    html: '',
  };
}


class Post extends Component {
  componentWillMount() {
    this.props.dispatch(fetchArticle(this.props.match.params.slug));
  }

  render() {
    const {
      title, categories, tags, date, html,
    } = this.props;
    let postView = null;

    if (title) {
      postView = (
        <PostCom
          title={title}
          categories={categories}
          tags={tags}
          date={date}
          html={html}
        />
      );
    } else {
      postView = <PostPlaceHolder />;
    }

    return postView;
  }
}


export default withRouter(connect(mapStateToProps)(Post));
