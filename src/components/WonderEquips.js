import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Badge, Glyphicon } from 'react-bootstrap';
import Search from './search/Search';
import Result from './result/Result';
// import logo from '../logo.svg';
// import './App.css';

export default class WonderEquips extends Component {
    render() {
        return (
            // Navbar도 빼야하는지
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">WonderEquips</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Watched <Badge>0</Badge>
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Setting <Glyphicon glyph="cog" />
                        </NavItem>
                    </Nav>
                </Navbar>
                <Search />
                <Result />
            </div>
        );
    }
};