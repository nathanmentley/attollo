import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeFieldDefCreator extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateName = this.updateName.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);

        this.createDataTypeFieldDef = this.createDataTypeFieldDef.bind(this);
    }


    close() {
        this.props.CloseDataTypeFieldDefCreator();
    }

    updateName(event) {
        this.props.UpdateName(event.target.value);
    }

    getNameValidation() {
        const length = this.props.DataTypeFieldDef.name.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    createDataTypeFieldDef() {
        this.props.CreateDataTypeFieldDef();
    }

    render() {
        var self = this;
        
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.DataTypeFieldDef.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="dataTypeName"
                        validationState={this.getNameValidation()}
                    >
                        <ControlLabel>Data Type Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.DataTypeFieldDef.name}
                            placeholder="Enter Data Type Field Name"
                            onChange={this.updateName}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.createDataTypeFieldDef}>Save</Button>
                    <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}