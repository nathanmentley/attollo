import React from 'react';
import { OverlayTrigger, Popover, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../BaseComponent.jsx';


export default class ToolTip extends BaseComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <OverlayTrigger
                trigger={['hover']}
                placement="right"
                overlay={
                    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
                        <strong>{this.props.Title}</strong> {this.props.Content}
                    </Popover>
                }
            >
                <Glyphicon glyph="question-sign" />
            </OverlayTrigger>
        );
    }
}

