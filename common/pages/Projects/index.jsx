import React, { Component } from 'react';

require('./projects.less');

const list = [
  {
    name: 'Vue Stone',
    desc: '基于 Vue 的移动端 UI 组件库。',
    link: 'https://github.com/jd-smart-fe/vue-stone',
    image:
      'http://static.zybuluo.com/pspgbhu/r46m2gwpp2b9aabhnbc84elp/vue-stone.png',
  }, {
    name: 'React Isomorphic',
    desc: 'React 同构直出工程脚手架',
    link: 'https://github.com/pspgbhu/react-isomorphic',
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520541763181&di=5421f1ab7a5b72340d02b021493d244b&imgtype=0&src=http%3A%2F%2Fs1.51cto.com%2Fwyfs02%2FM01%2F88%2F7F%2FwKiom1f55HCSS-DrAACSkyHme8o914.png-wh_651x-s_1436211364.png',
  }, {
    name: 'C Swipe',
    desc: '一款轻量级 Vue2 轮播组件。',
    link: 'https://github.com/pspgbhu/vue-swipe-mobile',
    image: 'https://raw.githubusercontent.com/pspgbhu/pspgbhu.github.io/master/assets/img/cswipe-demo.gif',
  },
];

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
