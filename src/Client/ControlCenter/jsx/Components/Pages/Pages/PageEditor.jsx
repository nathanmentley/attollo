import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PageEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateUrl = this.updateUrl.bind(this);

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
                    <div>
                        <label>Name</label>
                        <input type="text" value={this.props.Page.title} onChange={this.updateTitle} />
                    </div>
                    <div>
                        <label>Domain</label>
                        <input type="text" value={this.props.Page.url} onChange={this.updateUrl} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.savePage}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deletePage}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}