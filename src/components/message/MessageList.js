import React from 'react';
import { ListGroup, Glyphicon } from 'react-bootstrap';
import Message from './Message';

export default class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        });
    };

    getDisplay = () => {
        return { display: this.state.show ? 'block' : 'none' };
    }

    render() {
        return (
            <div id="messageList">
                <div id="messageListBtn" className="align-center" onClick={this.toggleShow} >
                    {this.state.show ? <Glyphicon glyph="chevron-down" /> : <Glyphicon glyph="chevron-up" />}
                </div>
                <ListGroup style={this.getDisplay()}>
                    {
                        this.props.messageList.map((message, index) => {
                            return ( <Message key={index} message={message} /> )
                        })
                    }    
                </ListGroup>
            </div>
        );
    }
};