import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockContainerComponent from '../BaseBlockContainerComponent.jsx';
import BlockRenderer from '../Pages/Main/BlockRenderer.jsx';

export default class FourCol extends BaseBlockContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <Row>
                <Col xs={12} md={3}>
                    <BlockRenderer Block={self.getBlockForAreaCode('First')} UpdatePage={this.updatePage} />
                </Col>
                <Col xs={12} md={3}>
                    <BlockRenderer Block={self.getBlockForAreaCode('Second')} UpdatePage={this.updatePage} />
                </Col>
                <Col xs={12} md={3}>
                    <BlockRenderer Block={self.getBlockForAreaCode('Third')} UpdatePage={this.updatePage} />
                </Col>
                <Col xs={12} md={3}>
                    <BlockRenderer Block={self.getBlockForAreaCode('Fourth')} UpdatePage={this.updatePage} />
                </Col>
            </Row>
        );
    }
}