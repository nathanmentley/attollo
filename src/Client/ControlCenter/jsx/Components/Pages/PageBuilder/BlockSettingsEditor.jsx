import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockSettingsEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.saveBlockSettings = this.saveBlockSettings.bind(this);
    }

    close() {
        this.props.SetEditingSettingsBlock();
    }

    saveBlockSettings() {
        this.props.SaveBlockSettings();
    }

    render() {
        var self = this;

        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Block.BlockDef.name} - {this.props.Block.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.Block.BlockDef.BlockSettingDefs.map((x) => {
                            return (
                                <FormGroup
                                    controlId={x.code}
                                    validationState={"valid"}
                                >
                                    <ControlLabel>{x.title}</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={x.defaultvalue}
                                        placeholder={x.defaultvalue}
                                        onChange={() => {}}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock />
                                </FormGroup>
                            );
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveBlockSettings}>Save</Button>
                    <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}