import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeDefEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateName = this.updateName.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);

        this.saveDataType = this.saveDataType.bind(this);
        this.deleteDataType = this.deleteDataType.bind(this);
    }

    close() {
        this.props.SetEditingDataType();
    }

    updateName(event) {
        this.props.UpdateName(event.target.value);
    }

    getNameValidation() {
        const length = this.props.DataTypeDef.name.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    saveDataType() {
        this.props.SaveDataType();
    }

    deleteDataType() {
        this.props.DeleteDataType();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.DataTypeDef.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="dataTypeName"
                        validationState={this.getNameValidation()}
                    >
                        <ControlLabel>Data Type Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.DataTypeDef.name}
                            placeholder="Enter Data Type Name"
                            onChange={this.updateName}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveDataType}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deleteDataType}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}