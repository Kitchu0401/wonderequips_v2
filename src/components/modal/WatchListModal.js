import React from 'react';
import { Modal, NavItem, Badge, ListGroup, ListGroupItem, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import update from 'react-addons-update';
import data from '../../data/data';

const defaultState = {
    show: false,
    watchList: data.champs
};

const glyphiconStyle = {
    'color': 'green',
    'float': 'right'
}

const FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        { help && <HelpBlock>{help}</HelpBlock> }
    </FormGroup>
)

export default class WatchListModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
    }

    open = () => {
        this.setState({ show: true });
    }

    close = () => {
        this.setState({ show: false });
    }

    toggleWatch = ({ target: { id: _id } }) => {
        let targetIndex = this.state.watchList.findIndex((champ) => { return champ.id === Number(_id); });
        let watchList = update(
            this.state.watchList,
            {
                [targetIndex]: {
                    watched: { $set: !this.state.watchList[targetIndex].watched }
                }
            }
        );

        // TODO need to adjust watchIds for user data
        this.setState({ watchList: watchList });
    }

    handleWatchListChange = ({ target: { value: _value } }) => {
        let watchList = !_value
            ? data.champs
            : data.champs.filter((champ, index) => {
                return champ.name.indexOf(_value) === 0;
            });

        this.setState({
            watchList: update(
                this.state.watchList,
                { $set: watchList }
            )
        });
    }

    render() {
        return (
            <NavItem eventKey={1} onClick={() => this.open()}>
                Watched <Badge>{this.props.watchList.length}</Badge>

                <Modal show={this.state.show} onHide={this.close}>
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
                                this.state.watchList.map((champ, index) => (
                                    <ListGroupItem key={index} id={champ.id} onClick={this.toggleWatch}>
                                        {champ.name}
                                        {champ.watched ? <Glyphicon glyph="ok" style={glyphiconStyle}/> : undefined}
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

// index % 2 === 0 
//     ? <ListGroupItem key={index} onClick={() => this.toggleWatch(champ.id)}>
//         {champ.name}
//     </ListGroupItem>
//     : <ListGroupItem key={index} onClick={() => this.toggleWatch(champ.id)}>
//         {champ.name}
//         <Glyphicon glyph="ok" style={glyphiconStyle}/>
//     </ListGroupItem>

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