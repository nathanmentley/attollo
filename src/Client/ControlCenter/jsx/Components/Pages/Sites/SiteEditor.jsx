import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateName = this.updateName.bind(this);
        this.updateDomain = this.updateDomain.bind(this);

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

    saveSite() {
        this.props.SaveSite();
    }

    deleteSite() {
        this.props.DeleteSite();
    }

    render() {
        return (
            <div>
                <Modal show={true} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.Site.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>Name</label>
                            <input type="text" value={this.props.Site.name} onChange={this.updateName} />
                        </div>
                        <div>
                            <label>Domain</label>
                            <input type="text" value={this.props.Site.domain} onChange={this.updateDomain} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.saveSite}>Save</Button>
                        <Button bsStyle="danger" onClick={this.deleteSite}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}