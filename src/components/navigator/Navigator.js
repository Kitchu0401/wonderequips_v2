import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { WatchListModal } from '../index';

const glyphiconStyle = {
    'color': 'green',
    'float': 'right'
};

const Navigator = (props) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#" data-step='1' data-intro='WonderEquips에 어서오세요!'>WonderEquips</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
            <WatchListModal
                champList={props.champList}
                toggleWatchId={props.toggleWatchId} />
            <NavDropdown eventKey={2} title="Setting" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1} onClick={props.toggleIncludeEmpty}>
                    스킬 미보유 영웅 포함
                    {props.includeEmpty ? <Glyphicon glyph="ok" style={glyphiconStyle}/> : undefined}
                </MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
);

export default Navigator;