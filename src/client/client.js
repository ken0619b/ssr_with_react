// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import Home from './components/Home'; Route内でHomeコンポーネントを読んでいるのでこちらだと不要
import { BrowserRouter } from 'react-router-dom';
import  { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../client/reducers';

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
