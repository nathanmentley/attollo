import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);

        this.getTitleValidation = this.getTitleValidation.bind(this);
        this.getTemplateValidation = this.getTemplateValidation.bind(this);

        this.saveBlock = this.saveBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
    }

    close() {
        this.props.SetEditingBlock();
    }

    updateTitle(event) {
        this.props.UpdateTitle(event.target.value);
    }

    updateTemplate(event) {
        this.props.UpdateTemplate(event.target.value);
    }

    getTitleValidation() {
        const length = this.props.Block.title.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getTemplateValidation() {
        const length = this.props.Block.template.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    saveBlock() {
        this.props.SaveBlock();
    }

    deleteBlock() {
        this.props.DeleteBlock();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Block.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="blockTitle"
                        validationState={this.getTitleValidation()}
                    >
                        <ControlLabel>Block Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Block.title}
                            placeholder="Enter Block title"
                            onChange={this.updateTitle}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

                    <FormGroup
                        controlId="blockTemplate"
                        validationState={this.getTemplateValidation()}
                    >
                        <ControlLabel>Block Template</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Block.template}
                            placeholder="Enter Block template"
                            onChange={this.updateTemplate}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveBlock}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deleteBlock}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}