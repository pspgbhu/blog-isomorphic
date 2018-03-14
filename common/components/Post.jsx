import React from 'react';
import PropTypes from 'prop-types';

const Post = ({
  title, categories, tags, date, html,
}) => (
  <main className="col-md-8 main-content m-post">
    <article className="post">
      <div className="post-head">
        <h1 id={title}>
          {title}
        </h1>
        <div className="post-meta">
          <span className="categories-meta fa-wrap">
            <i className="fa fa-folder-open-o"></i>
            <span> </span>
            { categories && categories.map(item => (
              <span key={item}>{item} </span>
            ))}
          </span>

          <span className="fa-wrap">
            <i className="fa fa-tags"></i>
            <span className="tags-meta">
            <span> </span>
            { tags && tags.map(item => (
              <span key={item}>{item} </span>
            ))}
            </span>
          </span>

          <span className="fa-wrap">
            <i className="fa fa-clock-o"></i>
            <span className="date-meta"> {date}</span>
          </span>

          {/* <span className="fa-wrap">
            <span id="busuanzi_container_page_pv" style="display: inline;">
              阅读量
              <span id="busuanzi_value_page_pv">2</span>次
            </span>
          </span> */}
        </div>
      </div>

      <div className="post-body post-content">
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>

      <div className="post-footer">
        <div>
          作者：
          <a href="http://blog.pspgbhu.me/">Pspgbhu</a>
        </div>
        <div>
          发表日期：{date}
        </div>
        <div>
          版权声明：署名-非商业性使用-禁止演绎 3.0 国际（
          <a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" target="_blank">CC BY-NC-ND 3.0</a>）
        </div>
      </div>
    </article>
    {/* <div className="article-nav prev-next-wrap clearfix">
      <a href="/article/react-isomorphic/" className="next-post btn btn-default">下一篇
        <i className="fa fa-angle-right fa-fw"></i>
      </a>
    </div> */}
  </main>
);

Post.propTypes = {

};

export default Post;
