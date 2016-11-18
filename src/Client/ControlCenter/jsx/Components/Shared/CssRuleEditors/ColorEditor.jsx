import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { ChromePicker } from 'react-color';

import BaseComponent from '../../BaseComponent.jsx';

export default class ColorEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            color: this.currentColor()
        }

        this.currentColor = this.currentColor.bind(this);
        this.updateColor = this.updateColor.bind(this);
    }

    currentColor() {
        var hex = this.props.GetValueFromCode(this.props.CssRuleDef.code);

        if(hex && hex != '') {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: 0
            } : null;
        } else {
            return {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            };
        }
    }

    updateColor(value) {
        var self = this;

        this.setState({ color: value.rgb }, () => {
            self.props.SetValueForCode(self.props.CssRuleDef.code, value.hex)
        });
    }

    render() {
        return (
            <FormGroup
                key={this.props.CssRuleDef.code}
                controlId={this.props.CssRuleDef.code}
                validationState={"success"}
            >
                <ControlLabel>{this.props.CssRuleDef.name}</ControlLabel>

                <ChromePicker
                    color={this.state.color}
                    onChange={this.updateColor}
                />

                <FormControl.Feedback />
                <HelpBlock />
            </FormGroup>
        );
    }
}