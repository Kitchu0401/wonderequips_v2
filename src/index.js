import React from 'react';
import ReactDOM from 'react-dom';
import javascript_time_ago from 'javascript-time-ago';
import WonderEquips from './components/WonderEquips';
// styles
import './style/WonderEquips.css';
import './style/introjs.min.css';

// adjust 'en' locale
javascript_time_ago.locale(require('javascript-time-ago/locales/en'));

ReactDOM.render(
    <WonderEquips />,
    document.getElementById('root')
);
