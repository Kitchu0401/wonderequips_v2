import React from 'react';
import update from 'react-addons-update';
import * as service from '../services/service';
import { Grid, Col } from 'react-bootstrap';
import { introJs } from 'intro.js';
import { times } from 'lodash';
import { Navigator, Footer, Search, ResultList } from './index';

const LOCAL_STORAGE_KEY = {
    WATCH_IDS:      'wonderequips-watch-ids',
    INCLUDE_EMPTY:  'wonderequips-include-empty',
    SHOW_INTRO:     'wonderequips-show-intro'
};

const defaultState = {
    champList:              [],
    searchOption: {
        part:               0,
        pattern:            [0, 0, 0, 0, 0, 0],
        element:            -1,
        patternSelected:    false,
        includeEmpty:       false
    },
    resultList:             [],
    messageList:            []
}

export default class WonderEquips extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    componentDidMount() {
        Promise.all([
            // 0. extract watchIds from localStorage and apply to champList
            new Promise((onFurfilled, onRejected) => {
                // load champList from server
                service.getChampList().then((res) => { 
                    let champList = res.data.champList;
                    
                    (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.WATCH_IDS)) || []).forEach((id) => {
                        champList.find((champ) => { return champ.id === id; }).watched = true;
                    });

                    onFurfilled(champList);
                });
            }),
            // 1. extract includeEmpty from localStorage
            new Promise((onFurfilled, onRejected) => {
                onFurfilled(localStorage.getItem(LOCAL_STORAGE_KEY.INCLUDE_EMPTY) === 'true' || false);
            }),
            // 2. load recently saved messages from server
            service.getMessageList().then((res) => { return res.data.messageList; })
        ])
        .then((results) => {
            this.setState({ 
                champList: results[0],
                searchOption: update(
                    this.state.searchOption,
                    {
                        includeEmpty: { $set: results[1] }
                    }
                ),
                messageList: results[2]
            }, this.startIntroJs);
        });
    }

    /**
     * 튜토리얼 출력을 위한 introJs를 호출한다.
     * 이전에 확인한 사용자의 경우 자동으로 출력하지 않는다.
     */
    startIntroJs = () => {
        let showIntroJs = localStorage.getItem(LOCAL_STORAGE_KEY.SHOW_INTRO) === 'true' || false;
        if ( !showIntroJs ) { return; }

        introJs().onbeforechange((domElement) => {
            switch (domElement.dataset.step) {
                case '2':
                    // Makes random searchOption
                    let selectorCategorys   = document.querySelectorAll('#selector-category td');
                    let selectorPatterns    = document.querySelectorAll('#selector-pattern td');
                    let selectorElements    = document.querySelectorAll('#selector-element td');
                    
                    selectorCategorys[parseInt(Math.random() * selectorCategorys.length, 0)].click();
                    times(3, () => { selectorPatterns[parseInt(Math.random() * selectorPatterns.length, 0)].click(); });
                    selectorElements[parseInt(Math.random() * selectorElements.length, 0)].click();
                    break;
                case '3':
                    // Perform search
                    document.querySelectorAll('#selector-search td')[0].click();
                    break;
                case '5':
                    // Reset search results
                    document.querySelectorAll('#selector-search td')[1].click();
                    break;
                default:
                    break;
            }
        }).onexit(() => {
            // Register localStorage value to prevent repeated call
            localStorage.setItem(LOCAL_STORAGE_KEY.SHOW_INTRO, false);
        }).start();
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

    /**
     * 선택한 검색 부위에 스킬이 존재하지 않는 챔피언의 결과 포함 여부를 선택 또는 해제한다.
     * 
     * 이후 html5.localStorage에 includeEmpty를 저장한다.
     */
    toggleIncludeEmpty = () => {
        this.setState({
            searchOption: update(
                this.state.searchOption,
                {
                    includeEmpty: { $set: !this.state.searchOption.includeEmpty }
                }
            )
        }, () => {
            localStorage.setItem(LOCAL_STORAGE_KEY.INCLUDE_EMPTY, this.state.searchOption.includeEmpty);
        });
    }

    /**
     * 챔피언 목록 검색 옵션을 선택한다.
     */
    selectSearchOption = (prop, value) => {
        // 문양의 경우 i:종류, v:숫자의 배열로 처리
        if ( prop === 'pattern' ) {
            let sum = this.state.searchOption.pattern.reduce((p, c) => { return p + c; }, 0);
            if ( sum >= 4 ) { return; }

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
     * 챔피언 목록 검색 옵션 중 선택된 문양을 검색 조건에서 제외한다.
     */
    cancleSearchPattern = (patternIndex) => {
        let _pattern        = this.state.searchOption.pattern;
        let pattern         = update(_pattern, { [patternIndex]: { $set: Math.max(_pattern[patternIndex] - 1, 0) } }); 
        let patternSelected = pattern.some((value) => { return value > 0 });

        this.setState({
            searchOption: update(
                this.state.searchOption,
                { 
                    pattern: { $set: pattern },
                    patternSelected: { $set: patternSelected }
                }
            )
        });
    }

    /**
     * 선택한 검색옵션과 일치하는 검색결과를 표시한다.
     */
    search = () => {
        // pattern이 선택되지 않은 경우 검색하지 않는다.
        if ( !this.state.searchOption.patternSelected ) { return; }

        // Send log to server before search.
        service.insertLog();

        let resultList = [];

        let { champList, searchOption } = this.state;
        for ( let idx in champList ) {
            let champ = champList[idx];

            // filter: element
            if ( searchOption.element >= 0 && searchOption.element !== champ.element ) { continue; }

            // filter: part
            let requirements = champ.skill[searchOption.part];
            if ( (!requirements && searchOption.includeEmpty)
                    || (requirements && this._check(requirements)) ) {
                resultList.push(champ);
            }
        }

        // post-process: sort resultList by order (watched first)
        resultList.sort((prev, curr) => {
            if ( prev.watched === true && !curr.watched ) return -1;
            if ( curr.watched === true && !prev.watched ) return 1;
            return 0;
        });

        this.setState({ resultList: resultList });
    }

    /**
     * 선택한 검색옵션을 초기화한다.
     */
    reset = () => {
        // https://github.com/Kitchu0401/wonderequips_v2/issues/1
        // this.setState(defaultState);

        this.setState({
            searchOption:   defaultState.searchOption,
            resultList:     []
        });
    }

    /**
     * 서버로 메시지를 전송한다.
     */
    sendMessage = (content) => {
        service.insertMessage(content)
            .then((res) => { 
                if ( res.data.message ) {
                    alert(res.data.message);
                    return;
                }

                this.setState({ messageList: res.data.messageList });
            })
            .catch((err) => { console.error(err); });
    }

    /**
     * Private functions:
     *  해당 패턴이 검색조건으로 충족되는지 여부를 반환한다.
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
        const { champList, searchOption, resultList, messageList } = this.state;
        return (
            <div id="container-main">
                <Navigator
                    champList={champList}
                    includeEmpty={searchOption.includeEmpty}
                    toggleWatchId={this.toggleWatchId}
                    toggleIncludeEmpty={this.toggleIncludeEmpty} />
                <Grid>
                    <Col sm={12} md={10} mdOffset={1}>
                        <Search
                            selectSearchOption={this.selectSearchOption}
                            cancleSearchPattern={this.cancleSearchPattern}
                            searchOption={searchOption}
                            search={this.search}
                            reset={this.reset} />
                        <ResultList resultList={resultList} />
                    </Col>
                </Grid>
                <Footer 
                    messageList={messageList}
                    sendMessage={this.sendMessage} />
            </div>
        );
    }
};