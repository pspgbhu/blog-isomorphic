import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/404';

require('./style/_style.less');

const navList = [
  {
    name: '首页',
    link: '/',
  },
];

const App = () => ((
  <div>
    <Header />
    <Nav navList={navList}></Nav>
    <section className="content-wrap">
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </section>
    <Footer />
  </div>
));

export default App;
