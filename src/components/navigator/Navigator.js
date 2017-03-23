import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Badge, Glyphicon } from 'react-bootstrap';

export default class SearchCategory extends Component {
    render() {
        return (
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
            </div>
        );
    }
};