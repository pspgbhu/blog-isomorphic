import React from 'react';
import { connect } from 'react-redux';
import Viewblock from '../components/Viewblock';
import Spinner from '../components/Spinner';
import OvlistBaseClass from './OvlistBaseClass';

function mapStateToProps(state) {
  const { slugsList, posts } = state;

  // It will to calculate how many articles to show, in first scene.
  // And the number of first shown articles depends on the index of post
  // that the first one has no brief.
  let done = false;
  let showIndex = -1;
  slugsList.forEach((slug) => {
    if (done) return;
    if (posts[slug].brief) {
      showIndex += 1;
      return;
    }
    done = true;
  });

  return {
    slugsList,
    posts,
    showIndex,
  };
}

class Ovlist extends OvlistBaseClass {
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
    const { slugsList, posts } = this.props;
    return (
      <main className="col-md-9 main-content">
        {slugsList.map((slug, index) => {
          const {
            title, categories, tags, date, brief, img,
          } = posts[slug];

          return index <= this.props.showIndex ?
            (
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
            ) : null;
        })}
        {this.state.loading && <Spinner/>}
      </main>
    );
  }
}

export default connect(mapStateToProps)(Ovlist);
