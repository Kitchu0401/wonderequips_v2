import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { MessageListModal } from '../index';

const Footer = ({ messageList, sendMessage }) => (
    <Navbar className="no-collapse" fixedBottom>
        <Nav pullLeft>
            <NavItem>
                Written by <strong>Kitchu</strong>
            </NavItem>
        </Nav>
        <Nav pullRight>
            <MessageListModal
                messageList={messageList}
                sendMessage={sendMessage} />
        </Nav>
    </Navbar>
);

export default Footer;