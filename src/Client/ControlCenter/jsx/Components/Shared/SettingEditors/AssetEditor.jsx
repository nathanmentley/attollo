import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import AssetService from '../../../Services/AssetService.jsx';

export default class AssetEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Assets: []
        };
    }

    componentDidMount() {
        AssetService.GetDirectoryListing()
            .then((result) => {
                this.setState({ Assets: result.data.data });
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

                <FormControl
                    componentClass="select"
                    value={this.props.GetValueFromCode(this.props.Code)}
                    placeholder={''}
                    onChange={(e) => { this.props.SetValueForCode(this.props.Code, e.target.value) }}
                >
                    {
                        this.state.Assets.map((x) => {
                            return (
                                <option key={x} value={x}>
                                    {x}
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