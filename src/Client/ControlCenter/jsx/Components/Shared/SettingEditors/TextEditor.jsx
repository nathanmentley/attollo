import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class TextEditor extends BaseComponent {
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

                <FormControl
                    type="text"
                    value={this.props.GetValueFromCode(this.props.Code)}
                    placeholder={this.props.DefaultValue}
                    onChange={(e) => { this.props.SetValueForCode(this.props.Code, e.target.value) }}
                />

                <FormControl.Feedback />
                <HelpBlock />
            </FormGroup>
        );
    }
}