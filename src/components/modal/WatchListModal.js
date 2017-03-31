import React, { Component } from 'react';
import { Modal, NavItem, Badge, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import data from '../../data/data';

const defaultState = {
    show: false
};

const glyphiconStyle = {
    'color': 'green',
    'float': 'right'
}

export default class WatchListModal extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    open = () => {
        this.setState({
            show: true
        });
    }

    close = () => {
        this.setState({
            show: false
        })
    }

    toggleWatch = (id) => {
        console.debug('toggleWatch fired!', id);
    }

    render() {
        return (
            <NavItem eventKey={1} onClick={() => this.open()}>
                Watched <Badge>{this.props.watchList.length}</Badge>

                <Modal show={this.state.show} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Watched champion list:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup >
                            {  
                                data.champs.map((champ, index) => (
                                    index % 2 === 0 
                                      ? <ListGroupItem key={index} onClick={() => this.toggleWatch(champ.id)}>
                                            {champ.name}
                                        </ListGroupItem>
                                      : <ListGroupItem key={index} onClick={() => this.toggleWatch(champ.id)}>
                                            {champ.name}
                                            <Glyphicon glyph="ok" style={glyphiconStyle}/>
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

// const WatchListModal = (props) => (
//     <Modal show={props.show}>
//         <Modal.Header closeButton>
//             <Modal.Title>Modal Heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <h4>Testing..</h4>
//         </Modal.Body>
//     </Modal>
// );
// 
// export default WatchListModal;