import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class UserEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.saveUser = this.saveUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    close() {
        this.props.SetEditingUser();
    }

    saveUser() {
        this.props.SaveUser();
    }

    deleteUser() {
        this.props.DeleteUser();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.User.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveUser}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deleteUser}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}