import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Viewblock = ({
  title, cate, tags, date, brief, img, slug,
}) => (
  <article className="post">
    <div className="post-media">
      <a>
        <img className="img-ajax" src={img}
          alt="title"
        />
      </a>
    </div>
    <div className="post-content post-overview">
      <div className="post-head home-post-head">
        <h1 className="post-title">
          <a href="/article/react-isomorphic/">{title}</a>
        </h1>
        <div className="post-meta">• <time className="post-date" dateTime={date} title="">{date}</time>
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
            <span> </span>
            { cate && cate.map(item => (
              <span key={item}>{item} </span>
            ))}
          </span>
          <span className="fa-wrap">
            <i className="fa fa-tags"></i>
            <span> </span>
            { tags && tags.map(tag => (
              <span className="tags-meta" key={tag}>{tag} </span>
            ))}
          </span>
          <span className="fa-wrap">
            <i className="fa fa-clock-o"></i>
            <span> </span>
            <span className="date-meta">{date}</span>
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
  cate: PropTypes.array.isRequired,
  tags: PropTypes.array,
  date: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Viewblock;
