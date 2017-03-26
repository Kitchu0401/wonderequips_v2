import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Result } from '../';

const ResultList = ({ post, comments }) => {
    const commentList = comments.map(
        (comment, index) => (
            <Result 
                key={index} 
                comment={comment} />
        )
    );

    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <ListGroup>
                {commentList}
            </ListGroup>
        </div>
    );
};

export default ResultList;