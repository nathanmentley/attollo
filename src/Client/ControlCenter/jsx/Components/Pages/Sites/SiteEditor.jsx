import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateName = this.updateName.bind(this);
        this.updateDomain = this.updateDomain.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);
        this.getDomainValidation = this.getDomainValidation.bind(this);

        this.saveSite = this.saveSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    close() {
        this.props.SetEditingSite();
    }

    updateName(event) {
        this.props.UpdateName(event.target.value);
    }

    updateDomain(event) {
        this.props.UpdateDomain(event.target.value);
    }

    getNameValidation() {
        const length = this.props.Site.name.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getDomainValidation() {
        const length = this.props.Site.domain.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    saveSite() {
        this.props.SaveSite();
    }

    deleteSite() {
        this.props.DeleteSite();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Site.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="siteName"
                        validationState={this.getNameValidation()}
                    >
                        <ControlLabel>Site Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Site.name}
                            placeholder="Enter Site name"
                            onChange={this.updateName}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

                    <FormGroup
                        controlId="siteDomain"
                        validationState={this.getDomainValidation()}
                    >
                        <ControlLabel>Site Domain</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Site.domain}
                            placeholder="Enter Site Domain"
                            onChange={this.updateDomain}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveSite}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deleteSite}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}