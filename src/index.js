import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux'

import 'antd/dist/antd.css';
import './assets/style/index.scss';

import App from './App';
import store from './store';

window.React = React;

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

console.log('welcome to my football')