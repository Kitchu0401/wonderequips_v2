// import axios from 'axios';

import axios from 'axios';

export function insertLog() {
    return axios.post('/api/log', { type: 'Search' });
}

export function getMessageList() {
    return axios.get('/api/message');
}

export function insertMessage(content) {
    return axios.post('/api/message', { content: content });
}