import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import RichTextEditor from 'react-rte';

import BaseComponent from '../../BaseComponent.jsx';

export default class HtmlEditor extends BaseComponent {
    constructor(props) {
        super(props);

        var currentValue = this.props.GetValueFromCode(this.props.Code);

        this.state = {
            value: currentValue ?
                    RichTextEditor.createValueFromString(currentValue, 'html') :
                    RichTextEditor.createEmptyValue()
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        var self = this;

        this.setState({ value }, () => {
            self.props.SetValueForCode(this.props.Code, value.toString('html'));
        });
    }

    render() {
        return (
            <FormGroup
                key={this.props.Code}
                controlId={this.props.Code}
                validationState={"success"}
            >
                <ControlLabel>{this.props.Title}</ControlLabel>

                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                />

                <FormControl.Feedback />
                <HelpBlock />
            </FormGroup>
        );
    }
}