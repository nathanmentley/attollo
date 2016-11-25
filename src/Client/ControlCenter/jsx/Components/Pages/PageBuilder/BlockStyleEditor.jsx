import React from 'react';
import { Grid, Row, Col, Modal, Button, PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import CssRuleEditor from '../../Shared/CssRuleEditor.jsx';

import BaseComponent from '../../BaseComponent.jsx';

import ArrayUtils from '../../../Utils/ArrayUtils.jsx';

export default class BlockStyleEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentDefCode: null,
            activePanelKey: null
        };

        this.setCurrentDefCode = this.setCurrentDefCode.bind(this);
        this.updateCurrentPanel = this.updateCurrentPanel.bind(this);

        this.close = this.close.bind(this);

        this.getValueFromCode = this.getValueFromCode.bind(this);
        this.setValueForCode = this.setValueForCode.bind(this);

        this.saveBlockStyle = this.saveBlockStyle.bind(this);
    }

    setCurrentDefCode(code) {
        this.setState({ currentDefCode: code });
    }

    updateCurrentPanel(activeKey) {
        this.setState({ activePanelKey: activeKey });
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
        var cssRuleGroups = ArrayUtils.GetUnique(this.props.CssRuleDefs, (x) => x.CssRuleDefGroup.code);

        var styleEditor = <div />;

        if(this.state.currentDefCode != null) {
            var cssRuleDef = this.props.CssRuleDefs.find((x) => { return x.code == self.state.currentDefCode; });

            styleEditor = <CssRuleEditor
                CssRuleDef={cssRuleDef}
                GetValueFromCode={self.getValueFromCode}
                SetValueForCode={self.setValueForCode}
            />;
        }

        return (
            <Modal className="style-editor-modal" show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Block.BlockDef.name} - {this.props.Block.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col md={6}>
                                <PanelGroup activeKey={this.state.activePanelKey} onSelect={this.updateCurrentPanel} accordion>
                                    {
                                        cssRuleGroups.map((group) => {
                                            return (
                                                <Panel key={group} header={group} eventKey={group}>
                                                    <ListGroup fill>
                                                        {
                                                            self.props.CssRuleDefs.filter((def) => { return def.CssRuleDefGroup.code == group; }).map((def) => {
                                                                return (
                                                                    <ListGroupItem
                                                                        className="css-rule-def-selector"
                                                                        key={def.id}
                                                                        onClick={() => { self.setCurrentDefCode(def.code); }}
                                                                    >
                                                                        {def.name} - {def.description}
                                                                    </ListGroupItem>
                                                                );
                                                            })
                                                        }
                                                    </ListGroup>
                                                </Panel>
                                            );
                                        })
                                    }
                                </PanelGroup>
                            </Col>
                            <Col md={6}>
                                {styleEditor}
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveBlockStyle}>Save</Button>
                    <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}