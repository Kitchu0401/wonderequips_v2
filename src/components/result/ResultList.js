import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Result } from '../';

const ResultList = ({ post, comments }) => (
    <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <ListGroup>
            {
                comments.map(function(comment, index) { 
                    return (<Result key={index} comment={comment} />);
                })
            }
        </ListGroup>
    </div>
);

export default ResultList;