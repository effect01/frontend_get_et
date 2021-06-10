import React from 'react';
import ReactDOM from 'react-dom';
// CSSS SSCS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './Css/index.css';
import './Css/App.css';
import './Css/Product.css';
import App from './App.js';

import {Provider} from 'react-redux';
import store from './store/index';


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
