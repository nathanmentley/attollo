import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class UserCreator extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateName = this.updateName.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);
        this.getPasswordValidation = this.getPasswordValidation.bind(this);

        this.createUser = this.createUser.bind(this);
    }

    close() {
        this.props.CloseUserCreator();
    }

    updateName(event) {
        this.props.UpdateName(event.target.value);
    }

    updatePassword(event) {
        this.props.UpdatePassword(event.target.value);
    }

    getNameValidation() {
        const length = this.props.User.name.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getPasswordValidation() {
        const length = this.props.User.password.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    createUser() {
        this.props.CreateUser();
    }

    render() {
        var self = this;
        
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.User.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="userName"
                        validationState={this.getNameValidation()}
                    >
                        <ControlLabel>User Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.User.name}
                            placeholder="Enter User Name"
                            onChange={this.updateName}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

                    <FormGroup
                        controlId="password"
                        validationState={this.getPasswordValidation()}
                    >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.User.password}
                            placeholder="Enter Password"
                            onChange={this.updatePassword}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.createUser}>Save</Button>
                    <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}