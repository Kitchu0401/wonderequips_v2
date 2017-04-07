import React from 'react';
import axios from 'axios';
import update from 'react-addons-update';
import { Grid, Col } from 'react-bootstrap';
import { Navigator, Search, ResultList } from './';
import data from '../data/data';

const LOCAL_STORAGE_KEY = {
    WATCH_IDS:      'wonderequips-watch-ids',
    INCLUDE_EMPTY:  'wonderequips-include-empty'
};

const defaultState = {
    champList:  [],
    searchOption: {
        part:               0,
        pattern:            [0, 0, 0, 0, 0, 0],
        element:            -1,
        patternSelected:    false,
        includeEmpty:       false
    },
    resultList: []
}

export default class WonderEquips extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    componentDidMount() {
        let champList       = data.champs;
        let includeEmpty    = false;

        // extract watchIds from localStorage and apply to champList
        (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.WATCH_IDS)) || []).forEach((id) => {
            champList.find((champ) => { return champ.id === id; }).watched = true;
        });

        includeEmpty = localStorage.getItem(LOCAL_STORAGE_KEY.INCLUDE_EMPTY) || false;

        this.setState({ 
            champList: champList,
            searchOption: update(
                this.state.searchOption,
                {
                    includeEmpty: { $set: includeEmpty }
                }
            )
        });
    }

    /**
     * 주시 챔피언 목록에 선택한 챔피언을 추가한다.
     * 이미 추가되어 있는 경우 선택한 챔피언을 제거한다.
     * 
     * 이후 html5.localStorage에 watchIds를 저장한다.
     */
    toggleWatchId = (id) => {
        let targetIdx = this.state.champList.findIndex((champ, index) => {
            return champ.id === id;
        });

        this.setState({
            champList: update(
                this.state.champList,
                {
                    [targetIdx]: {
                        watched: { $set: !this.state.champList[targetIdx].watched }
                    }
                }
            )
        }, () => {
            // save watchIds to localStorage
            let watchIds = this.state.champList.reduce((prev, champ) => {
                if ( champ.watched ) prev.push(champ.id);
                return prev;
            }, []);

            localStorage.setItem(LOCAL_STORAGE_KEY.WATCH_IDS, JSON.stringify(watchIds));
        });
    }

    toggleIncludeEmpty = () => {
        this.setState({
            searchOption: update(
                this.state.searchOption,
                {
                    includeEmpty: { $set: !this.state.searchOption.includeEmpty }
                }
            )
        });
    }

    /**
     * 챔피언 목록 검색 옵션을 선택한다.
     */
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
            this.setState({ 
                searchOption: update(
                    this.state.searchOption,
                    { [prop]: { $set: value } }
                )
            });
        }
    }

    /**
     * 선택한 검색옵션과 일치하는 검색결과를 표시한다.
     */
    search = () => {
        // Send message to server before search.
        axios.post('/api/message', { message: 'Search tried.' })
            .then((res) => { console.log(res); })
            .catch((err) => { console.error(err); });

        let resultList = [];

        // reset pre-searched resultList
        // this.setState({ resultList: [] });

        let { champList, opt } = this.state;
        for ( let idx in champList ) {
            let champ = champList[idx];

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

    /**
     * 선택한 검색옵션을 초기화한다.
     */
    reset = () => {
        this.setState(defaultState);
    }

    // 

    /**
     * Private functions:
     *  해당 패턴이 검색조건으로 충족하는지 여부를 반환한다.
     */
    _check = (requirements) => {
        let pattern = this.state.searchOption.pattern;

        // 해당 부위 장비의 스킬 해제를 위해 요구되는 패턴이 검색조건으로 충족되는지 확인하고,
        // 충족되지 못한 패턴이 존재 할 경우 만능패턴(Star)로 충족 가능한지 확인하여 반환한다.
        return requirements.reduce((prev, curr, idx) => {
            return prev + Math.max(0, curr - pattern[idx]);
        }, 0) <= pattern[5];
    }

    render() {
        const { champList, searchOption, resultList } = this.state;
        return (
            <div>
                <Navigator
                    champList={champList}
                    includeEmpty={searchOption.includeEmpty}
                    toggleWatchId={this.toggleWatchId}
                    toggleIncludeEmpty={this.toggleIncludeEmpty} />
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