import React, { Component } from 'react';
import { Throttle } from '../../utils';

require('./backtop.less');

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      shown: false,
    };
  }

  render() {
    return this.state.shown ?
      (<div className="backtop" onClick={() => this.toTop()}>
        <i className="fa fa-arrow-up"></i>
      </div>
      ) : null;
  }

  componentDidMount() {
    this.ifShown();

    const throttle = new Throttle(200);
    document.addEventListener('scroll', (e) => {
      throttle(() => this.ifShown());
    }, { passive: true });
  }

  ifShown = () => {
    this.setState({
      shown: window.scrollY > window.innerHeight * 1.5,
    });
  }

  toTop = () => {
    window.scrollTo(0, 0);
  }
}
