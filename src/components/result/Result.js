import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const Result = ({ result }) => (
    <ListGroupItem>
        <h3>{result.name}</h3>
    </ListGroupItem>
);

export default Result;