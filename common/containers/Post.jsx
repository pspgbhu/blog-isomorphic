import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostCom from '../components/Post';

function mapStateToProps(state, props) {
  const post = state.posts[props.match.params.slug];
  return {
    title: post.title,
    categories: post.categories,
    tags: post.tags,
    date: post.date,
    html: post.html,
  };
}

const Post = ({
  title, categories, tags, date, html,
}) => (
  <PostCom
    title={title}
    categories={categories}
    tags={tags}
    date={date}
    html={html}
  />
);

export default withRouter(connect(mapStateToProps)(Post));
