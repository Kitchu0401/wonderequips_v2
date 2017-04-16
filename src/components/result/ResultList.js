import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Result from './Result';

const getResultListMarkups = (resultList) => {
    return resultList.length <= 0
        ? ( <ListGroupItem header="no search result." className="align-center" /> )
        : resultList.map((result, i) => ( <Result result={result} key={i}/> ));
}

const ResultList = ({ resultList }) => (
    <ListGroup>
        {getResultListMarkups(resultList)}
    </ListGroup>
)

export default ResultList;