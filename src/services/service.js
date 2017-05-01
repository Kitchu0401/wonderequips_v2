// import axios from 'axios';

import axios from 'axios';

const baseUrl = '/WonderEquips/api';

// Configuring axios instance
// const instance = axios.create({
//     baseUrl: '/WonderEquips/api',
//     timeout: 2500
// });

export function insertLog() {
    return axios.post(`${baseUrl}/log`, { type: 'Search' });
}

export function getMessageList() {
    return axios.get(`${baseUrl}/message`);
}

export function insertMessage(content) {
    return axios.post(`${baseUrl}/message`, { content: content });
}