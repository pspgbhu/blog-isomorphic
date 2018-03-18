import React, { Component } from 'react';
import { connect } from 'react-redux';
import Viewblock from '../components/Viewblock';

function mapStateToProps(state) {
  const { slugsList, posts } = state;

  return {
    slugsList,
    posts,
  };
}

const Ovlist = ({ slugsList, posts }) => {
  const list = slugsList.map((slug) => {
    const {
      title, categories, tags, date, brief, img,
    } = posts[slug];
    return (
      <Viewblock
        key={slug}
        title={title}
        categories={categories}
        tags={tags}
        date={date}
        brief={brief}
        img={img}
        slug={slug}
      />
    );
  });

  return (
    <main className="col-md-9 main-content">
      {list}
    </main>
  );
};

export default connect(mapStateToProps)(Ovlist);
