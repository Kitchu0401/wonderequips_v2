import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Result from './Result';

export default class ResultList extends Component {
    resultListMarkups = () => {
        return this.props.resultList.length <= 0
            ? <ListGroupItem header="no search result." className="align-center" />
            : this.props.resultList.map((result, i) => <Result result={result} key={i}/>);
    }

    render() {
        return (
            <div>
                <ListGroup>
                    {this.resultListMarkups()}
                </ListGroup>
            </div>
        );
    }
}