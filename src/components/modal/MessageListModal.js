import React from 'react';
import { Modal, NavItem, Glyphicon, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { MessageList } from '../index';

const defaultState = {
    show: false
};

export default class MessageListModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    /**
     * 모달을 표시하거나 감춘다.
     */
    toggleShow = () => {
        this.setState({ 
            show:       !this.state.show
        });
    }

    handleKeyPress = (e) => {
        if ( e.key === 'Enter' ) {
            if ( this.messageInput.value.length <= 0 ) { return; }
            this.props.sendMessage(this.messageInput.value);
            this.messageInput.value = '';    
        }
    };

    handleClickButton = (e) => {
        if ( this.messageInput.value.length <= 0 ) { return; }
        this.props.sendMessage(this.messageInput.value);
        this.messageInput.value = '';
    }

    render() {
        return (
            <NavItem eventKey={1} onClick={() => this.toggleShow()}>
                <Glyphicon glyph="comment" />

                <Modal show={this.state.show} onHide={this.toggleShow}>
                    <Modal.Body>
                        <FormGroup>
                            <InputGroup>
                                <FormControl
                                    id="messageInput"
                                    type="text"
                                    label="Send message:"
                                    inputRef={ (ref) => { this.messageInput = ref; } }
                                    onKeyPress={this.handleKeyPress} />
                                <InputGroup.Button>
                                    <Button type="button" onClick={this.handleClickButton}>Send</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                        <MessageList messageList={this.props.messageList} />
                    </Modal.Body>
                </Modal>
            </NavItem>
        )
    }

}