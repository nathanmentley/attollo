import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class SingleSelectListEditor extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <FormGroup
                key={this.props.CssRuleDef.code}
                controlId={this.props.CssRuleDef.code}
                validationState={"success"}
            >
                <ControlLabel>{this.props.CssRuleDef.name}</ControlLabel>

                <FormControl
                    componentClass="select"
                    value={this.props.GetValueFromCode(this.props.CssRuleDef.code)}
                    placeholder={''}
                    onChange={(e) => { this.props.SetValueForCode(this.props.CssRuleDef.code, e.target.value) }}
                >
                    {
                        this.props.CssRuleDef.options.split('|').map((x) => {
                            var title = x.split('=')[0];
                            var value = x.split('=')[1];

                            return (
                                <option key={self.props.CssRuleDef.options.indexOf(x)} value={value}>
                                    {title}
                                </option>
                            );
                        })
                    }
                </FormControl>

                <FormControl.Feedback />
                <HelpBlock />
            </FormGroup>
        );
    }
}