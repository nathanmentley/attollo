import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateUrl = this.updateUrl.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);
        this.getUrlValidation = this.getUrlValidation.bind(this);

        this.savePage = this.savePage.bind(this);
        this.deletePage = this.deletePage.bind(this);
    }

    close() {
        this.props.SetEditingPage();
    }

    updateTitle(event) {
        this.props.UpdateTitle(event.target.value);
    }

    updateUrl(event) {
        this.props.UpdateUrl(event.target.value);
    }

    getNameValidation() {
        const length = this.props.Page.title.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getUrlValidation() {
        const length = this.props.Page.url.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    savePage() {
        this.props.SavePage();
    }

    deletePage() {
        this.props.DeletePage();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Page.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="pageName"
                        validationState={this.getNameValidation()}
                    >
                        <ControlLabel>Page Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Page.title}
                            placeholder="Enter Page Name"
                            onChange={this.updateTitle}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

                    <FormGroup
                        controlId="siteDomain"
                        validationState={this.getUrlValidation()}
                    >
                        <ControlLabel>Page URL</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Page.url}
                            placeholder="Enter Page Url"
                            onChange={this.updateUrl}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.savePage}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deletePage}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}