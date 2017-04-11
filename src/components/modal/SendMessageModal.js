import React from 'react';
import { Modal, NavItem, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import FieldGroup from '../index';

const defaultState = {
    show: false
};

export default class SendMessageModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    /**
     * 모달을 표시하거나 감춘다.
     */
    toggleShow = () => {
        this.setState({ 
            show:       !this.state.show,
            keyword:    ''
        });
    }

    /**
     * 검색창에 입력된 검색어를 state에 반영한다.
     */
    handleWatchListChange = ({ target: { value: _value } }) => {
        this.setState({ keyword: _value });
    }

    render() {
        return (
            <NavItem eventKey={9} onClick={() => this.toggleShow()}>
                Written by <strong>Kitchu</strong>

                <Modal show={this.state.show} onHide={this.toggleShow}>
                    <Modal.Header closeButton>
                        <FieldGroup
                            id="champName"
                            type="text"
                            label="Text"
                            placeholder="Champion name search:"
                            onChange={this.handleWatchListChange} />
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup >
                            {  
                                this.props.champList
                                    .filter((champ, index) => {
                                        // name search에 해당하는 챔피언만 출력
                                        return !this.state.keyword || champ.name.indexOf(this.state.keyword) > -1;
                                    })
                                    .map((champ, index) => (
                                        <ListGroupItem key={index} id={champ.id} onClick={() => { this.props.toggleWatchId(champ.id); }}>
                                            {champ.name}
                                            {champ.watched ? <Glyphicon glyph="ok" /> : undefined}
                                        </ListGroupItem>
                                    ))
                            }
                        </ListGroup>
                    </Modal.Body>
                </Modal>
            </NavItem>
        )
    }

}