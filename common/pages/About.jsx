import React from 'react';
import Aside from '../components/Aside';

const About = () => (
  <div>
    <main className="col-md-9">
      <div className="post">
        <div className="post-body post-content" style={{ border: 'none', marginTop: '0' }}>
          <h2>关于本站</h2>
          <p>
            这个网站是我的个人博客，主要分享一些个人原创的技术文章。
          </p>
          <p>
            最初是使用 hexo 来搭建的这个网站，后来全部用 React 重构了一遍，重构的同时顺便做了 React 的服务端渲染。并且在构建整个 React 服务端渲染的过程中，提炼出了一套快速构建 React 服务端渲染的脚手架：<a href="https://github.com/pspgbhu/react-isomorphic">react-isomorphic</a> 。
          </p>
          <h2>关于我</h2>
          <p>
            我在网络上的 ID 是 pspgbhu，可以理解为 psp + gb + hu，因为小时候特别喜欢玩游戏，就一直梦想着拥有一台高端掌机 (╯︵╰)，PSP 和 GB 都曾是我梦想中的掌机，而这个从初中就开始用的 ID 则表现了一个青春少年对美好生活的无限向往。还有，原来在高中的时候跟同学们一起信春哥，因此 Brotherchun 也是我经常用的另外一个 ID。
          </p>
          <p>
            现在的我就职在京东，主要做 Web 开发方面的工作。不仅限于前端开发，在服务端开发方面也有着很多的实操经验。而且我一直认为一个优秀的软件工程师是不应该将自己束缚在一个固定的岗位上，而是应该有着出色的学习能力和解决问题能力，在有需要的时候能够胜任任何岗位。
          </p>
          <h2>联系方式</h2>
          <ul>
            <li>GitHub: <a href="https://github.com/pspgbhu">pspgbhu</a></li>
            <li>Email: <a href="mailto:brotherchun001@gmail.com">brotherchun001@gmail.com</a></li>
          </ul>
        </div>
      </div>
    </main>
    <Aside
      categories
      arch
      tags
      social
    />
  </div>
);

export default About;
