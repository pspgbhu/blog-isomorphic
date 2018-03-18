import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ArchivesListCom from '../components/ArchivesList';


function mapStateToProps(state, ownProps) {
  const { slugsList, posts } = state;
  const { year, month } = ownProps.match.params;

  const filterSlugs = slugsList.map((slug) => {
    const date = new Date(posts[slug].date);
    let choosen = '';

    if (!month && year && date.getFullYear() === year * 1) {
      choosen = slug;
    }

    if (month && year
    && date.getMonth() + 1 === month * 1 && date.getFullYear() === year * 1) {
      choosen = slug;
    }

    return choosen;
  }).filter(item => item);

  return {
    filterSlugs,
    posts,
  };
}

class ArchivesList extends Component {
  render() {
    return (
      <main className="col-md-9 main-content">
        <ArchivesListCom filterSlugs={this.props.filterSlugs} posts={this.props.posts} />
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(ArchivesList));
