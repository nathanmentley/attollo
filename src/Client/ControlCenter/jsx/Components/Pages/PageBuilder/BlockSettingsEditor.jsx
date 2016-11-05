import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockSettingsEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.getValueFromCode = this.getValueFromCode.bind(this);
        this.setValueForCode = this.setValueForCode.bind(this);

        this.saveBlockSettings = this.saveBlockSettings.bind(this);
    }

    close() {
        this.props.SetEditingSettingsBlock();
    }

    getValueFromCode(code) {
        var blockSettingDefId = this.props.Block.BlockDef.BlockSettingDefs.find((x) => { return x.code == code; }).id;
        var setting = this.props.Block.BlockSettings.find((x) => { return x.blocksettingdefid == blockSettingDefId; });

        if(setting) {
            return setting.value;
        } else {
            return '';
        }
    }

    setValueForCode(code, value) {
        this.props.UpdateBlockSetting(
            this.props.Block.BlockDef.BlockSettingDefs.find((x) => { return x.code == code; }).id,
            value
        );
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
                                    key={x.code}
                                    controlId={x.code}
                                    validationState={"success"}
                                >
                                    <ControlLabel>{x.title}</ControlLabel>
                                    
                                    <ReactQuill theme="snow"
                                        value={self.getValueFromCode(x.code)}
                                        onChange={(value) => { self.setValueForCode(x.code, value) }} />

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

/*
<FormControl
    type="text"
    value={self.getValueFromCode(x.code)}
    placeholder={x.defaultvalue}
    onChange={(e) => { self.setValueForCode(x.code, e.target.value) }}
/>
*/