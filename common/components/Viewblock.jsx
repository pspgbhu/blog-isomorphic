import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatdate } from '../utils';

const Viewblock = ({
  title, categories, tags, date, brief, img, slug,
}) => (
  <article className="post">
    <div className="post-media">
      {/* <div className="img img-ajax" style={{
        background: 'center center no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(${img})`,
      }}></div> */}
      <img className="img" src={img} />
    </div>
    <div className="post-content post-overview">
      <div className="post-head home-post-head">
        <h1 className="post-title">
          <Link to={`/article/${slug}`}>{title}</Link>
        </h1>
        <div className="post-meta">• <time className="post-date" title="">{formatdate(date, 'yyyy年mm月dd日')}</time>
        </div>
      </div>
      <p className="brief">
        {brief}
      </p>
    </div>
    <footer className="post-footer clearfix">
      <div className="pull-left tag-list">
        <div className="post-meta">
          <span className="categories-meta fa-wrap">
            <i className="fa fa-folder-open-o"></i>
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
            <span> </span>
            <span className="date-meta">{formatdate(date, 'yyyy/mm/dd')}</span>
          </span>
        </div>
      </div>

      <div className="post-permalink">
        <Link to={`/article/${slug}`} className="btn btn-default">阅读全文</Link>
      </div>
    </footer>
  </article>
);


Viewblock.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  tags: PropTypes.array,
  date: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Viewblock;
