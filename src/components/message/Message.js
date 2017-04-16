import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import { ListGroupItem } from 'react-bootstrap';

const Message = ({ message }) => (
    <ListGroupItem className="message">
        <p>{message.content}</p>
        <ReactTimeAgo locale="en">{Date.parse(message.published_date)}</ReactTimeAgo>
    </ListGroupItem>
);

export default Message;