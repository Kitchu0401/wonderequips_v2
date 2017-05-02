import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Message from './Message';

const MessageList = ({ messageList }) => (
    <ListGroup>
         {
             messageList.map((message, index) => {
                 return ( <Message key={index} message={message} /> )
             })
         }    
     </ListGroup>
);

export default MessageList;