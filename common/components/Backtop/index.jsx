import React, { Component } from 'react';
import { Throttle, now } from '../../utils';

require('./backtop.less');

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      shown: false,
    };
  }

  render() {
    return (
      <div className={ this.state.shown ? 'backtop backtop-shown' : 'backtop' } onClick={() => this.toTop()}>
        <i className="fa fa-arrow-up"></i>
      </div>
    );
  }

  componentDidMount() {
    this.ifShown();

    const throttle = new Throttle(100);
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
    const speed = 3000;
    const distance = window.scrollY;
    const startTime = now();
    let done = false;

    const animation = () => {
      if (done) return;

      const usedTime = now() - startTime;
      const d = this.formula(usedTime, speed, distance);
      window.scrollTo(0, d);

      if (d <= 0) done = true;

      window.requestAnimationFrame(() => animation());
    };
    animation();
  }

  /**
   *
   * @param   {Number}  ut      used time
   * @param   {Number}  speed   total time
   * @param   {Number}  d       total distance
   * @return  {Number}          应该移动的距离
   */

  formula(ut, tt, d) {
    return d * ((tt - (ut ** 1.25)) / tt);
  }
}
