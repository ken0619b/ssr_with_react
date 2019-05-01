// Startup point for the client side application
import React from 'react';
import ReactDOM from 'react-dom';
// import Home from './components/Home'; Route内でHomeコンポーネントを読んでいるのでこちらだと不要
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.hydrate(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.querySelector('#root')
);
