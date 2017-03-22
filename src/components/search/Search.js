import React, { Component } from 'react';
import SearchCategory from './SearchCategory';
import SearchElement from './SearchElement';
import SearchPattern from './SearchPattern';

export default class Search extends Component {
    render() {
        return (
            <div>
                <SearchCategory />
                <SearchElement />
                <SearchPattern />
            </div>
        );
    }
};