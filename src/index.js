import React from 'react';
import ReactDOM from 'react-dom';
import javascript_time_ago from 'javascript-time-ago';
import WonderEquips from './components/WonderEquips';
// import './style/index.css// ';

// adjust 'en' locale
javascript_time_ago.locale(require('javascript-time-ago/locales/en'));

ReactDOM.render(
    <WonderEquips />,
    document.getElementById('root')
);
