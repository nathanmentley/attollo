import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageCreator extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
        this.updatePageDef = this.updatePageDef.bind(this);

        this.getNameValidation = this.getNameValidation.bind(this);
        this.getUrlValidation = this.getUrlValidation.bind(this);

        this.createPage = this.createPage.bind(this);
    }


    close() {
        this.props.ClosePageCreator();
    }

    updateTitle(event) {
        this.props.UpdateTitle(event.target.value);
    }

    updateUrl(event) {
        this.props.UpdateUrl(event.target.value);
    }

    updatePageDef(event) {
        this.props.UpdatePageDef(event.target.value);
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

    createPage() {
        this.props.CreatePage();
    }

    deletePage() {
        this.props.DeletePage();
    }

    render() {
        var self = this;
        
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.Page.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="pageDef"
                    >
                        <ControlLabel>Page Type</ControlLabel>
                        
                        <FormControl
                            componentClass="select"
                            placeholder="Enter Page Type"
                            value={this.props.Page.pagedefid}
                            onChange={this.updatePageDef}
                        >
                            {
                                self.props.PageDefs.map((pageDef) => {
                                    return (
                                        <option
                                            key={pageDef.id}
                                            value={pageDef.id}
                                        >
                                            {pageDef.name}
                                        </option>
                                    );
                                })
                            }
                        </FormControl>

                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

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
                    <Button bsStyle="primary" onClick={this.createPage}>Save</Button>
                    <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}