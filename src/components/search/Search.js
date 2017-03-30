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
                    <td colSpan="3">
                        {
                            this.props.searchOption.pattern.map((v, i) => {
                                return times(v, (_i) => ( <Mark key={_i} pattern={i} /> ))
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
                <Table className='selector' bordered>
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