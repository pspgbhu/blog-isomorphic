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
      title, category, tags, date, brief, img, link,
    }) => (
      <Viewblock
        key={link}
        title={title}
        category={category}
        tags={tags}
        date={date}
        brief={brief}
        img={img}
        link={link}
      />
    ))}
  </main>
);


export default connect(mapStateToProps)(Ovlist);
