import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefLogicEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.updateContent = this.updateContent.bind(this);

        this.savePluginDefLogic = this.savePluginDefLogic.bind(this);
        this.deletePluginDefLogic = this.deletePluginDefLogic.bind(this);
    }

    close() {
        this.props.Close();
    }

    updateContent(value) {
        this.props.UpdateContent(value);
    }

	savePluginDefLogic() {
        this.props.SavePluginDefLogic();
    }

	deletePluginDefLogic() {
        this.props.DeletePluginDefLogic();
    }

    render() {
        return (
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing {this.props.PluginDefLogic.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="pageName"
                    >
                        <ControlLabel>Content</ControlLabel>

                        <AceEditor
                            mode="javascript"
                            theme="github"
                            editorProps={{$blockScrolling: true}}
                            width="100%"
                            enableBasicAutocompletion={true}
                            value={this.props.PluginDefLogic.content}
                            onChange={this.updateContent}
                        />

                        <FormControl.Feedback />
                        <HelpBlock />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.savePluginDefLogic}>Save</Button>
                    <Button bsStyle="danger" onClick={this.deletePluginDefLogic}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}