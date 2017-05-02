// import axios from 'axios';

import axios from 'axios';

// Configuring axios instance
const instance = axios.create({
    baseURL: '/WonderEquips/api',
    timeout: 2500
});

export function insertLog() {
    return instance.post('/log', { type: 'Search' });
}

export function getMessageList() {
    return instance.get('/message');
}

export function insertMessage(content) {
    return instance.post('/message', { content: content });
}