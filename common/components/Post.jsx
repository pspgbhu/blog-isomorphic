import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { formatdate } from '../utils';

class Post extends Component {
  /**
   * I met an issue:
   * Working with React Router, I go to a new page with React Router,
   * the parent component trigger componentDidMount before children's.
   * But when I go to that page at the second time, the components trigger
   * componentDidMount by a correct order (children's called before parent's).
   */
  componentDidMount() {
    if (this.props.didMount) {
      this.props.didMount();
    }
  }

  render() {
    const {
      title, categories, tags, date, html, slug,
    } = this.props;
    return (
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
                <span key={item}>
                  <Link to={`/categories/${item}/`}>{item}</Link> </span>
              ))}
            </span>

            <span className="fa-wrap">
              <i className="fa fa-tags"></i>
              <span> </span>
              { tags && tags.map(tag => (
                <span className="tags-meta" key={tag}>
                  <Link to={`/tags/${tag}/`}>{tag}</Link> </span>
              ))}
            </span>

            <span className="fa-wrap">
              <i className="fa fa-clock-o"></i>
              <span className="date-meta"> {formatdate(date, 'yyyy/mm/dd')}</span>
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
            发表日期：{formatdate(date, 'yyyy年mm月dd日')}
          </div>
          <div>
            原文链接：<a href={`http://blog.pspgbhu.me/article/${slug}`}>{title}</a>
          </div>
          <div>
            版权声明：署名-非商业性使用-禁止演绎 3.0 国际（
            <a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" target="_blank">CC BY-NC-ND 3.0</a>）
          </div>
        </div>
      </article>
    );
  }
}

export default withRouter(Post);
