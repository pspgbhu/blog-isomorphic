/**
 * 此文件只会被客户端所引用，为了保证前后端路由的一致性，
 * 请不要在此文件写入路由逻辑！
 * 请只在 /common/App.jsx 中编辑路由逻辑。
 */

import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../common/reducers';

import App from '../common/App';
import ScrollToTop from './ScrollToTop';

// 通过服务端注入的全局变量得到初始的 state
const preloadedState = window.__INITIAL_STATE_;

const store = createStore(reducer, preloadedState, applyMiddleware(
  thunk,
  logger,
));

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App></App>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,

  document.querySelector('#app'),
);
