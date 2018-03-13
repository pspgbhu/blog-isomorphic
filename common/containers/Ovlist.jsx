import React, { Component } from 'react';
import { connect } from 'react-redux';
import Viewblock from '../components/Viewblock';

function mapStateToProps(state) {
  return {
    overviewList: state.overviewList,
  };
}

const Ovlist = ({ overviewList }) => (
  <main className="col-md-8 main-content">
    {overviewList.map(({
      title, categories, tags, date, brief, img, slug,
    }) => (
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
    ))}
  </main>
);


export default connect(mapStateToProps)(Ovlist);
