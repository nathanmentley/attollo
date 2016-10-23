import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockContainerComponent from '../BaseBlockContainerComponent.jsx';

export default class OneCol extends BaseBlockContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        
        return (
            <Row>
                <Col xs={12} md={12}>
                    <this.props.BlockRenderer Block={self.getBlockForAreaCode('First')} UpdatePage={this.updatePage} />
                </Col>
            </Row>
        );
    }
}