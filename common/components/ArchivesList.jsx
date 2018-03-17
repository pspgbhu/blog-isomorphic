import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ArchivesList = ({ filterSlugs, posts, match }) => {
  const { year, month } = match.params;
  const link = `archives/${year && year + '/'}${month && month + '/'}`;
  return (
    <div id="main">
      <div id="post-list">
        <ul className="archives-post-list">
          <h1 className="info">{ year && `${year}年`} {month && `${month}月`}</h1>
          { filterSlugs.map(slug => (
            <li className="post-items" key={slug}>
              <h3 className="post-item-title">
                <Link to={`/article/${slug}`}>{posts[slug].title}</Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ArchivesList.propTypes = {};

export default withRouter(ArchivesList);
