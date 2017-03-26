import React, { Component } from 'react';
import update from 'react-addons-update';
import SearchCategory from './SearchCategory';
import SearchElement from './SearchElement';
import SearchPattern from './SearchPattern';


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOption: {
                part:       0,
                pattern:    0,
                element:    0
            }
        };
    }

    selectSearchOption = (prop, value) => {
        this.setState({ searchOption: update(
            this.state.searchOption,
            {
                [prop]: { $set: value }
            }
        )});

        // console.log( this.state.searchOption );
    }

    getSelectedStyle = (prop, value) => {
        return this.state.searchOption[prop] === value ? 'bold' : 'normal';
    }

    render() {
        const option = this.state.searchOption;

        return (
            <div>
                <p>Part: {option.part}</p>
                <p>Pattern: {option.pattern}</p>
                <p>Element: {option.element}</p>
                <SearchCategory selectSearchOption={this.selectSearchOption} getSelectedStyle={this.getSelectedStyle}/>
                <SearchPattern selectSearchOption={this.selectSearchOption} getSelectedStyle={this.getSelectedStyle}/>
                <SearchElement selectSearchOption={this.selectSearchOption} getSelectedStyle={this.getSelectedStyle}/>
            </div>
        );
    }
};