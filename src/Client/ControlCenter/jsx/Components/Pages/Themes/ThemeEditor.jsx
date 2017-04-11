import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class ThemeEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.saveTheme = this.saveTheme.bind(this);
        this.deleteTheme = this.deleteTheme.bind(this);

	    this.updateName = this.updateName.bind(this);
	    this.updateCode = this.updateCode.bind(this);
    }

    close() {
        this.props.Close();
    }

	saveTheme() {
        this.props.SaveTheme();
    }

	deleteTheme() {
        this.props.DeleteTheme();
    }

	updateName(event) {
		this.props.UpdateName(event.target.value);
	}

	updateCode(event) {
		this.props.UpdateCode(event.target.value);
	}

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing {this.props.Theme.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="name"
                    >
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Theme.name}
                            placeholder="Enter Name"
                            onChange={this.updateName}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>

                    <FormGroup
                        controlId="code"
                    >
                        <ControlLabel>Code</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.Theme.code}
                            placeholder="Enter Code"
                            onChange={this.updateCode}
                        />
                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveTheme}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deleteTheme}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}