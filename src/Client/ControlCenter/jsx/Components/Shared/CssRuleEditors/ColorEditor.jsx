import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class ColorEditor extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup
                key={this.props.CssRuleDef.code}
                controlId={this.props.CssRuleDef.code}
                validationState={"success"}
            >
                <ControlLabel>{this.props.CssRuleDef.name}</ControlLabel>

                <FormControl
                    type="text"
                    value={this.props.GetValueFromCode(this.props.CssRuleDef.code)}
                    placeholder={''}
                    onChange={(e) => { this.props.SetValueForCode(this.props.CssRuleDef.code, e.target.value) }}
                />

                <FormControl.Feedback />
                <HelpBlock />
            </FormGroup>
        );
    }
}