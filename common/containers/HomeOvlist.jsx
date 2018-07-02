import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBrief } from '../actions/fetchBrief';
import Viewblock from '../components/Viewblock';
import Spinner from '../components/Spinner';
import { Throttle } from '../utils';

function mapStateToProps(state) {
  const { slugsList, posts } = state;

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

class Ovlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.throttleScroll = new Throttle(200, { execLastOne: true });

    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.updateTop();
    this.updateWindowHeight();
    document.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, { passive: true });
    window.removeEventListener('resize', this.handleResize, { passive: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.showIndex !== prevProps.showIndex) {
      this.updateTop();
    }
  }

  updateTop() {
    const baseTop = 180 + 60 + 30;
    this.top = document.querySelector('#slugs').offsetHeight + baseTop;
  }

  updateWindowHeight() {
    this.windowHeight = window.innerHeight;
  }

  handleScroll() {
    this.throttleScroll(() => {
      const h = window.scrollY + this.windowHeight;
      if (h > this.top) {
        this.more();
      }
    });
  }

  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.updateTop();
      this.updateWindowHeight();
    }, 300);
  }

  more() {
    if (this.fetching) return;
    this.fetching = true;

    if (this.props.showIndex === this.props.slugsList.length - 1) {
      return;
    }

    this.setState({
      loading: true,
    });

    const index = this.props.showIndex + 5 > this.props.slugsList.length - 1 ?
      this.props.slugsList.length - 1 :
      this.props.showIndex + 5;

    this.props.dispatch(fetchBrief(index)).then(() => {
      this.fetching = false;
      this.setState({
        loading: false,
      });
    }).catch(() => {
      this.fetching = false;
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { slugsList, posts } = this.props;
    return (
      <main id="slugs" className="col-md-9 main-content">
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
