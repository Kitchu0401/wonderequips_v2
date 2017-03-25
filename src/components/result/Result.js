import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const Result = ({ comment }) => (
    <ListGroupItem>
        <h3>{comment.name}</h3>
        <h6>{comment.email}</h6>
        <p>{comment.body}</p>
    </ListGroupItem>
);

export default Result;