import React from 'react';
import { Navbar, Nav, NavItem, FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
// import FieldGroup from '../index';

export default class Footer extends React.Component {
    
    handleKeyPress = (e) => {
        if ( e.key === 'Enter' ) {
            this.props.sendMessage(this.messageInput.value);
            this.messageInput.value = '';    
        }
    };

    handleClickButton = (e) => {
        this.props.sendMessage(this.messageInput.value);
        this.messageInput.value = '';
    }

    render() {
        return (
            <Navbar fixedBottom>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <InputGroup>
                            <FormControl 
                                id="messageInput"
                                type="text"
                                placeholder="Leave message"
                                inputRef={ (ref) => { this.messageInput = ref; } }
                                onKeyPress={this.handleKeyPress} />
                            <InputGroup.Button>
                                <Button type="button" onClick={this.handleClickButton}>Send</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Navbar.Form>
                <Nav pullRight>
                    <NavItem>
                        Written by <strong>Kitchu</strong>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
};