import React, { Component } from 'react';
import list from './list';

require('./projects.less');

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      list,
    };
  }

  render() {
    return (
      <main className="projects">
        {this.state.list.map(item => (
          <div key={item.name} className="col-sm-4 projects-block">
            <article className="projects-item">
              <a href={item.link}>
                <div
                  className="projects-image"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                ></div>
              </a>
              <div className="projects-desc">
                <h3 className="projects-desc-title"><a href={item.link}>{item.name}</a></h3>
                <p>{item.desc}</p>
              </div>
            </article>
          </div>
        ))}
      </main>
    );
  }
}
