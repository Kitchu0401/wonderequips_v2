import React from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
// import FieldGroup from '../index';

const messageContentStyle = {
    'marginRight': '6px'
}

const Footer = (props) => (
    <Navbar fixedBottom>
        <Navbar.Form pullLeft>
            <FormGroup>
                <FormControl
                    id="messageContent"
                    type="text"
                    style={messageContentStyle}
                    placeholder="Leave message" />
            </FormGroup>
            <Button type="button" onClick={props.sendMessage}>Send</Button>
        </Navbar.Form>
        <Nav pullRight>
            <NavItem>
                Written by <strong>Kitchu</strong>
            </NavItem>
        </Nav>
    </Navbar>
);

export default Footer;