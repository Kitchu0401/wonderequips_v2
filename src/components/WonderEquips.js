import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Col } from 'react-bootstrap';
import update from 'react-addons-update';
import data from '../data/data';
import { Navigator, Search, ResultList } from './';
// import * as service from '../services/service';

const defaultState = {
    watchIds: [],
    watchList:  [],
    searchOption: {
        part:               0,
        pattern:            [0, 0, 0, 0, 0, 0],
        element:            -1,
        patternSelected:    false,
        includeEmpty:       false
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

            this.setState({ 
                searchOption: update(
                    this.state.searchOption,
                    { 
                        [prop]: {
                            [value]: { $set: this.state.searchOption[prop][value] + 1 }
                        },
                        patternSelected: { $set: true }
                    }
                )
            });
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
        // Send message to server before search.
        axios.post('/api/message', { message: 'Search tried.' })
            .then((res) => { console.log(res); })
            .catch((err) => { console.error(err); });

        let resultList = [];

        // reset pre-searched resultList
        // this.setState({ resultList: [] });

        let opt = this.state.searchOption;
        for ( let idx in data.champs ) {
            let champ = data.champs[idx];

            // filter: element
            if ( opt.element >= 0 && opt.element !== champ.element ) { continue; }

            // filter: part
            let requirements = champ.skill[opt.part];
            if ( (!requirements && opt.includeEmpty)
                    || (requirements && this._check(requirements)) ) {
                resultList.push(champ);
            }
        }

        this.setState({ resultList: resultList });
    }

    reset = () => {
        this.setState(defaultState);
    }

    // private functions
    _check = (requirements) => {
        let pattern = this.state.searchOption.pattern;

        // 해당 부위 장비의 스킬 해제를 위해 요구되는 패턴이 검색조건으로 충족되는지 확인하고,
        // 충족되지 못한 패턴이 존재 할 경우 만능패턴(Star)로 충족 가능한지 확인하여 반환한다.
        return requirements.reduce((prev, curr, idx) => {
            return prev + Math.max(0, curr - pattern[idx]);
        }, 0) <= pattern[5];
    }

    render() {
        const { watchIds, watchList, searchOption, resultList } = this.state;
        return (
            <div>
                <Navigator watchIds={watchIds} watchList={watchList}/>
                <Grid>
                    <Col sm={12} md={10} mdOffset={1}>
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