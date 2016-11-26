import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeFieldDefEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateName = this.updateName.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);

        this.saveDataType = this.saveDataType.bind(this);
        this.deleteDataType = this.deleteDataType.bind(this);

        this.updateDataTypeFieldType = this.updateDataTypeFieldType.bind(this);
    }

    close() {
        this.props.SetEditingDataType();
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

    saveDataType() {
        this.props.CreateDataTypeFieldDef();
    }

    deleteDataType() {
        this.props.DeleteDataTypeFieldDef();
    }

    updateDataTypeFieldType(event) {
        this.props.UpdateDataTypeFieldType(event.target.value);
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
                        controlId="dataTypeFieldType"
                    >
                        <ControlLabel>Data Type Field Type</ControlLabel>
                        
                        <FormControl
                            componentClass="select"
                            placeholder="Enter Data Type Field Type"
                            value={this.props.DataTypeFieldDef.datatypefieldtypeid}
                            onChange={this.updateDataTypeFieldType}
                        >
                            {
                                self.props.DataTypeFieldTypes.map((dataTypeFieldTypes) => {
                                    return (
                                        <option
                                            key={dataTypeFieldTypes.id}
                                            value={dataTypeFieldTypes.id}
                                        >
                                            {dataTypeFieldTypes.name}
                                        </option>
                                    );
                                })
                            }
                        </FormControl>

                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

                    <FormGroup
                        controlId="dataTypeName"
                        validationState={this.getNameValidation()}
                    >
                        <ControlLabel>Data Type Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.DataTypeFieldDef.name}
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