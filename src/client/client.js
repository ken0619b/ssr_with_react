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
import axios from 'axios';

// serverへのアクセスに使用する。 なので、apiサーバーを向かせない
// このとき、'/api/*'はproxyが適用される

const axiosInstance = axios.create({
  baseURL: '/api'
});



const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))); //thnkの振る舞いを変えるため、withExtraArgumentを使う

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
