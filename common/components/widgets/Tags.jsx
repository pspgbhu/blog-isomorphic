import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Widget from '../Widget';


function mapStateToProps(state) {
  return {
    tags: state.tags,
  };
}


const WidgetTags = ({ tags }) => (
  <Widget title="标签" >
    <div className="content tag-cloud">
      { tags && tags.map(tag => (
        <Link to={`/tags/${tag}`} key={tag} style={{ fontSize: '10px' }}>
          {tag}
        </Link>
      ))}
    </div>
  </Widget>
);


export default withRouter(connect(mapStateToProps)(WidgetTags));
