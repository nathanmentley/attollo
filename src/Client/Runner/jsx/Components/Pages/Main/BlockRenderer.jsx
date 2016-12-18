import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../../../../Common/jsx/Components/BaseComponent.jsx';

import BlockComponent from './BlockComponent.jsx';

export default class BlockRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }

    render() {
        return ( 
            <div data-block-id={this.props.Block.id}>
                <BlockComponent Block={this.props.Block} UpdatePage={this.updatePage} TemplateProcessor={this.props.TemplateProcessor} DataTypeResolver={this.props.DataTypeResolver} />
            </div>
        );
    }
}