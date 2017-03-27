import React, { Component } from 'react';
import update from 'react-addons-update';
import { Grid, Col } from 'react-bootstrap';
import { Navigator, Search, ResultList } from './';
// import * as service from '../services/service';
import data from '../data/data';
// import logo from '../logo.svg';
// import './App.css';

const defaultState = {
    searchOption: {
        part:           0,
        pattern:        [0, 0, 0, 0, 0, 0],
        element:        0,
        includeEmpty:   true
    },
    resultList: []
}

export default class WonderEquips extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    componentDidMount() {
        // this.fetchPostInfo(1);
    }

    // // tutorial function
    // // babel plug-in: transform-class-properties로 인해 this 바인딩 불필요
    // fetchPostInfo = async (postId) => {
    //     this.setState({ isFetching: true });
    // 
    //     const info = await Promise.all([
    //         service.getPost(postId),
    //         service.getComments(postId)
    //     ]);
    // 
    //     // console.log(info);
    // 
    //     const { title, body } = info[0].data;
    //     const comments = info[1].data;
    //     
    //     this.setState({
    //         postId: postId,
    //         isFetching: false,
    //         post: {
    //             title:  title,
    //             body:   body
    //         },
    //         comments: comments
    //     });
    // 
    //     // const post = await service.getPost(postId);
    //     // console.log( post );
    //     // const comments = await service.getComments(postId);
    //     // console.log( comments );
    // }

    selectSearchOption = (prop, value) => {
        // 문양의 경우 i:종류, v:숫자의 배열로 처리
        if ( prop === 'pattern' ) {
            let sum = this.state.searchOption.pattern.reduce((p, c) => { return p + c; }, 0);
            if ( sum >= 3 ) { return; }

            this.setState({ searchOption: update(
                this.state.searchOption,
                { [prop]: {
                    [value]: { $set: this.state.searchOption[prop][value] + 1 } }
                }
            )});
        }
        // 부위 및 속성은 $set
        else {
            this.setState({ searchOption: update(
                this.state.searchOption,
                { [prop]: { $set: value } }
            )});
        }
    }

    search = () => {
        // reset pre-searched resultList
        this.setState({ resultList: [] });

        let opt = this.state.searchOption;
        for ( let idx in data.champs ) {
            let champ = data.champs[idx];

            // filter: element
            if ( opt.element !== champ.element ) { continue; }

            // filter: part
            let requirements = champ.skill[opt.part];
            if ( !requirements && opt.includeEmpty
                    && requirements && this._check(requirements)) {
                this.setState({ resultList: update({ $push: champ }) });
            }
        }
    }

    reset = () => {
        this.setState(defaultState);
    }

    // private functions
    _check = (requirements) => {
        // TODO checking requirements

    }

    render() {
        const { searchOption, resultList } = this.state;

        return (
            <div>
                <Navigator />
                <Grid>
                    <Col sm={12} md={10} mdOffset={1}>
                        <p>Part: {searchOption.part}</p>
                        <p>Pattern: {searchOption.pattern}</p>
                        <p>Element: {searchOption.element}</p>
                        <Search 
                            selectSearchOption={this.selectSearchOption}
                            searchOption={searchOption}
                            search={this.search}
                            reset={this.reset} />
                        <ResultList resultList={resultList} />
                    </Col>
                </Grid>
            </div>
        );
    }
};