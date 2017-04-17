import React, { Component } from 'react';
import { times } from 'lodash';
import { Table } from 'react-bootstrap';
import { SearchCategory, SearchElement, SearchPattern, Mark } from '../index';

export default class Search extends Component {
    getSelectedStyle = (prop, value) => {
        return this.props.searchOption[prop] === value ? 'bold' : 'normal';
    }

    getPatterns = () => {
        if ( this.props.searchOption.patternSelected ) {
            return (
                <tr>
                    <td colSpan='3'>
                        {
                            this.props.searchOption.pattern.map((v, i) => {
                                return times(v, (_i) => (
                                    <Mark key={_i} pattern={i} cancleSearchPattern={this.props.cancleSearchPattern} />
                                ));
                            })
                        }
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div>
                <div data-step='2' data-intro='발견한 장비의 옵션을 선택하고'>
                    <SearchCategory
                        selectSearchOption={this.props.selectSearchOption}
                        getSelectedStyle={this.getSelectedStyle} />
                    <SearchPattern 
                        selectSearchOption={this.props.selectSearchOption}
                        getSelectedStyle={this.getSelectedStyle}
                        patterns={this.getPatterns()} />
                    <SearchElement
                        selectSearchOption={this.props.selectSearchOption}
                        getSelectedStyle={this.getSelectedStyle} />
                </div>
                <Table
                    data-step='3' data-intro='검색 버튼을 눌러주세요!'
                    id='selector-search' className='selector' bordered>
                    <tbody>
                        <tr>
                            <td onClick={() => this.props.search()}>Search</td>
                            <td onClick={() => this.props.reset()}>Reset</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
};