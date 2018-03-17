import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

import Home from './pages/Home';
import NotFound from './pages/404';
import Article from './pages/Article';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import ArchivesList from './containers/ArchivesList';

require('./style/_style.less');

const navList = [
  {
    name: '首页',
    link: '/',
  },
];


const App = ({ matchSlug }) => (
  <div>
    <Header />
    <Nav navList={navList}></Nav>
    <section className="content-wrap">
      <div className="container">
        <div className="row">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={`/article/:slug(${matchSlug})`} component={Article} />
            <Route exact path="/categories/:categories" component={Categories} />
            <Route exact path="/tags/:tags" component={Tags} />
            <Route exact path="/archives/:year" component={ArchivesList} />
            <Route exact path="/archives/:year/:month" component={ArchivesList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

// export default App;

function mapStateToProps(state) {
  const matchSlug = state.slugsList;
  return {
    matchSlug: matchSlug.join('|'),
  };
}

export default withRouter(connect(mapStateToProps)(App));
