import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Viewblock from '../components/Viewblock';

function mapStateToProps(state, ownProps) {
  const { slugsList, posts } = state;
  const by = ['categories', 'tags'].indexOf(ownProps.by) > -1
    ? ownProps.by
    : 'categories';

  const matching = ownProps.match.params[by];

  const cateSlugs = slugsList.map((slug) => {
    const cates = posts[slug][by];
    if (cates && cates.indexOf(matching) > -1) {
      return slug;
    }
    return null;
  }).filter(item => item);

  return {
    matching,
    posts,
    cateSlugs,
  };
}

class CategoriesOvlist extends Component {
  render() {
    const { posts, cateSlugs, matching } = this.props;
    const list = cateSlugs.map((slug) => {
      const {
        title, categories, tags, date, brief, img,
      } = posts[slug];
      return (
        <Viewblock
          key={slug}
          title={title}
          categories={categories}
          tags={tags}
          date={date}
          brief={brief}
          img={img}
          slug={slug}
        />
      );
    });

    return (
      <main className="col-md-9 main-content">
        <h3>{matching}</h3>
        {list}
      </main>
    );
  }
}

CategoriesOvlist.defaultProps = {
  type: 'categories',
};

CategoriesOvlist.propTypes = {
  type: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(CategoriesOvlist));
