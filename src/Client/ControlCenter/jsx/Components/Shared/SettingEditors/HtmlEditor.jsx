import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import BaseComponent from '../../BaseComponent.jsx';

export default class HtmlEditor extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup
                key={this.props.Code}
                controlId={this.props.Code}
                validationState={"success"}
            >
                <ControlLabel>{this.props.Title}</ControlLabel>

                <ReactQuill theme="snow"
                    value={this.props.GetValueFromCode(this.props.Code)}
                    onChange={(value) => { this.props.SetValueForCode(this.props.Code, value) }}
                />

                <FormControl.Feedback />
                <HelpBlock />
            </FormGroup>
        );
    }
}