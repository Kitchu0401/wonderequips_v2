import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { WatchListModal } from '../index';

const Navigator = (props) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">WonderEquips</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
            <WatchListModal watchList={props.watchList}/>
            <NavItem eventKey={2} href="#">
                Setting <Glyphicon glyph="cog" />
            </NavItem>
        </Nav>
    </Navbar>
);

export default Navigator;