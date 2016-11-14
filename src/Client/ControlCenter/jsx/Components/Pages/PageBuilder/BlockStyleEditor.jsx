import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import CssRuleEditor from '../../Shared/CssRuleEditor.jsx';

export default class BlockStyleEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.getValueFromCode = this.getValueFromCode.bind(this);
        this.setValueForCode = this.setValueForCode.bind(this);

        this.saveBlockStyle = this.saveBlockStyle.bind(this);
    }

    close() {
        this.props.SetEditingStyleBlock();
    }

    getValueFromCode(code) {
        /*
        var blockSettingDefId = this.props.Block.BlockDef.BlockSettingDefs.find((x) => { return x.code == code; }).id;
        var setting = this.props.Block.BlockSettings.find((x) => { return x.blocksettingdefid == blockSettingDefId; });

        if(setting) {
            return setting.value;
        } else {
            return '';
        }
        */
        return '';
    }

    setValueForCode(code, value) {
        /*
        this.props.UpdateBlockStyle(
            this.props.Block.BlockDef.BlockSettingDefs.find((x) => { return x.code == code; }).id,
            value
        );
        */
    }

    saveBlockStyle() {
        this.props.SaveBlockStyle();
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
                        this.props.CssRuleDefs.map((x) => {
                            return (
                                <CssRuleEditor key={x.id}
                                    CssRuleDef={x}
                                    GetValueFromCode={self.getValueFromCode}
                                    SetValueForCode={self.setValueForCode}
                                />
                            );
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveBlockStyle}>Save</Button>
                    <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}