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
        if (this.props.SetEditingStyleBlock) {
            this.props.SetEditingStyleBlock();
        }
    }

    getValueFromCode(code) {
        if (this.props.BlockStyles != null) {
            for(var i = 0; i < this.props.BlockStyles.length; i++) {
                var blockStyle = this.props.BlockStyles[i];

                if(blockStyle.CssRule.CssRuleDef.code == code) {
                    return blockStyle.CssRule.value;
                }
            }
        }
        
        return '';
    }

    setValueForCode(code, value) {
        if (this.props.UpdateBlockStyle) {
            this.props.UpdateBlockStyle(code, value);
        }
    }

    saveBlockStyle() {
        if(this.props.SaveBlockStyle) {
            this.props.SaveBlockStyle();
        }
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