import React from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

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
                        this.props.messageList.map((msg, idx) => {
                            return ( <ListGroupItem key={msg._id}>[{msg._id}] {msg.content}</ListGroupItem> )
                        })
                    }    
                </ListGroup>
            </div>
        );
    }
};