import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Gitment from 'gitment';

require('gitment/style/default.css');

class Comments extends Component {
  render() {
    return (
      <div id="comments"></div>
    );
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    new Gitment({
      id: slug, // optional
      owner: 'pspgbhu',
      repo: 'blog-article-backup',
      oauth: {
        client_id: 'f0109912955c9ab71e4d',
        client_secret: '69bc375d03ad7c5f75e92736d80d79b8cbf7cf7d',
      },
    }).render('comments');
  }
}

export default withRouter(Comments);
