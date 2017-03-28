import React, { Component } from 'react';
import { times } from 'lodash';
import { Table } from 'react-bootstrap';
import SearchCategory from './SearchCategory';
import SearchElement from './SearchElement';
import SearchPattern from './SearchPattern';

export default class Search extends Component {
    getSelectedStyle = (prop, value) => {
        return this.props.searchOption[prop] === value ? 'bold' : 'normal';
    }

    getPatterns = () => {
        return this.props.searchOption.pattern.map((v, i) => {
            return times(v, (_v, _i) => (
                <span>{i}</span>
            ));
        });
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
                            <td onClick={() => this.props.reset()} colSpan='2'>Reset</td>
                            <td onClick={() => this.props.search()}>Search</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
};