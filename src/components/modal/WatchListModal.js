import React from 'react';
import { Modal, NavItem, Badge, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
// import FieldGroup from '../index';

const defaultState = {
    show: false,
    keyword: ''
};

const FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        { help && <HelpBlock>{help}</HelpBlock> }
    </FormGroup>
);

export default class WatchListModal extends React.Component {
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
            <NavItem data-step='5' data-intro='보유한 영웅을 즐겨찾기하여 목록 상단에서 볼 수 있어요!' eventKey={1} onClick={() => this.toggleShow()}>
                Watched 
                <Badge style={{ 'marginLeft': '6px' }}>
                    { 
                        this.props.champList.reduce((prev, curr) => {
                            return prev += curr.watched ? 1 : 0;
                        }, 0)
                    }
                </Badge>

                <Modal show={this.state.show} onHide={this.toggleShow}>
                    <Modal.Body>
                        <FieldGroup
                            id="champName"
                            type="text"
                            label="Champion name search:"
                            onChange={this.handleWatchListChange} />
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