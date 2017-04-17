import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Result from './Result';

const getResultListMarkups = (resultList) => {
    return resultList.length <= 0
        ? ( <ListGroupItem header="no search result." className="align-center" /> )
        : resultList.map((result, i) => ( <Result result={result} key={i}/> ));
}

const ResultList = ({ resultList }) => (
    <div data-step='4' data-intro='해당 장비로 스킬을 언락 할 수 있는<br/>영웅의 목록이 나타납니다!' data-position='top'>
        <ListGroup>
            {getResultListMarkups(resultList)}
        </ListGroup>
    </div>
)

export default ResultList;