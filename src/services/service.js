// import axios from 'axios';

import axios from 'axios';

const baseUrl = '/WonderEquips/api';

// Configuring axios instance
// const instance = axios.create({
//     baseUrl: '/WonderEquips/api',
//     timeout: 2500
// });

export function insertLog() {
    return instance.post(`${baseUrl}/log`, { type: 'Search' });
}

export function getMessageList() {
    return instance.get(`${baseUrl}/message`);
}

export function insertMessage(content) {
    return instance.post(`${baseUrl}/message`, { content: content });
}