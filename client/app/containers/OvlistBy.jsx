import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Viewblock from '../components/Viewblock';
import OvlistBaseClass from './OvlistBaseClass';
import Spinner from '../components/Spinner';

function mapStateToProps(state, ownProps) {
  const { slugsList, posts } = state;
  const by = ['categories', 'tags'].indexOf(ownProps.by) > -1
    ? ownProps.by
    : 'categories';

  const matching = decodeURI(ownProps.match.params[by]);

  const cateSlugs = slugsList.map((slug) => {
    const cates = posts[slug][by];
    if (cates && cates.indexOf(matching) > -1) {
      return slug;
    }
    return null;
  }).filter(item => item);

  // It will to calculate how many articles to show, in first scene.
  // And the number of first shown articles depends on the index of post
  // that the first one has no brief.
  let done = false;
  let showIndex = -1;
  cateSlugs.forEach((slug) => {
    if (done) return;
    if (posts[slug].brief) {
      showIndex += 1;
      return;
    }
    done = true;
  });

  return {
    matching,
    posts,
    slugsList: cateSlugs,
    showIndex,
  };
}

class CategoriesOvlist extends OvlistBaseClass {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, super.state, {
    });
  }

  componentDidMount() {
    super.handleDidMount();
  }

  componentWillUnmount() {
    super.handleUnmount();
  }

  componentDidUpdate(prevProps) {
    super.handleDidUpdate(prevProps);
  }

  render() {
    const { posts, slugsList, matching } = this.props;

    const list = slugsList.map((slug, index) => {
      const {
        title, categories, tags, date, brief, img,
      } = posts[slug];
      return index <= this.props.showIndex && (
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
        {this.state.loading && <Spinner/>}
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
