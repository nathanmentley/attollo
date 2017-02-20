import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteVersionEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateTheme = this.updateTheme.bind(this);

        this.saveSiteVersion = this.saveSiteVersion.bind(this);
        this.deleteSiteVersion = this.deleteSiteVersion.bind(this);
    }

    close() {
        this.props.SetEditingSiteVersion();
    }

    updateTheme(event) {
        this.props.UpdateTheme(event.target.value);
    }

    saveSiteVersion() {
        this.props.SaveSiteVersion();
    }

    deleteSiteVersion() {
        this.props.DeleteSiteVersion();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.SiteVersion.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="theme"
                    >
                        <ControlLabel>Theme</ControlLabel>

                        <FormControl
                            componentClass="select"
                            placeholder="Theme"
                            value={this.props.SiteVersion.themeid}
                            onChange={this.updateTheme}
                        >
		                    {
			                    this.props.Themes.map((theme) => {
				                    return (
                                        <option
                                            key={theme.id}
                                            value={theme.id}
                                        >
						                    {theme.name}
                                        </option>
				                    );
			                    })
		                    }
                        </FormControl>

                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveSiteVersion}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deleteSiteVersion}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}