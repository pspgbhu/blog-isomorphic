import { Component } from 'react';
import { fetchBrief } from '../actions/fetchBrief';
import { Throttle } from '../utils';

class Ovlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.firstShownIndex = 4;

    this.throttleScroll = new Throttle(100, { execLastOne: true });
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * call it in componentDidMount method in sub class
   */
  handleDidMount() {
    this.initShown();
    this.updateTop();
    this.updateWindowHeight();
    document.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  /**
   * call it in componentUnmount method in sub class.
   */
  handleUnmount() {
    document.removeEventListener('scroll', this.handleScroll, { passive: true });
    window.removeEventListener('resize', this.handleResize, { passive: true });
  }

  /**
   * call it in componentDidUpdate method in sub class.
   */
  handleDidUpdate(prevProps) {
    if (this.props.showIndex !== prevProps.showIndex) {
      // jump page form one category to another category, it will only
      // triger componentDidUpdate but componentDidMount, so we need call
      // initShown() in here.
      this.initShown();
      this.updateTop();
    }
  }

  initShown() {
    const difference = this.props.showIndex - this.firstShownIndex;
    if (difference < 0) {
      this.more(-difference);
    }
  }

  updateTop() {
    const baseTop = 180 + 60 + 30;
    const marginBottom = 20;
    const buffer = 40;
    const offsetHeight = document.querySelector('.content-wrap').offsetHeight;
    this.top = (offsetHeight + baseTop) - (marginBottom + buffer);
  }

  updateWindowHeight() {
    this.windowHeight = window.innerHeight;
  }

  handleScroll() {
    this.throttleScroll(() => {
      const h = window.scrollY + this.windowHeight;
      if (h > this.top) {
        this.more(5);
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

  more(number) {
    if (this.fetching) return;
    this.fetching = true;

    if (this.props.showIndex === this.props.slugsList.length - 1) {
      return;
    }

    this.setState({
      loading: true,
    });

    const index = this.props.showIndex + number > this.props.slugsList.length - 1 ?
      this.props.slugsList.length - 1 :
      this.props.showIndex + number;

    console.log(number, index);
    const list = this.props.slugsList.slice(0, index + 1);
    console.log(list);

    this.props.dispatch(fetchBrief(list)).then(() => {
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
}

export default Ovlist;
