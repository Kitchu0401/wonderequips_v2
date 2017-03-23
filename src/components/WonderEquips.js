import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Navigator, Search, ResultList } from './';
// import logo from '../logo.svg';
// import './App.css';

export default class WonderEquips extends Component {
    render() {
        return (
            // Navbar도 빼야하는지
            <div>
                <Navigator />
                <Grid>
                    <Col sm={12} md={10} mdOffset={1}>
                        <Search />
                        <ResultList />
                    </Col>
                </Grid>
            </div>
        );
    }
};