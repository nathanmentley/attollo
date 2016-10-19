import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockContainerComponent from '../BaseBlockContainerComponent.jsx';
import BlockRenderer from '../Pages/Main/BlockRenderer.jsx';

export default class OneCol extends BaseBlockContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        
        return (
            <Row>
                <Col xs={12} md={12}>
                    {(this.props.Blocks != null && this.props.Blocks.length >= 0) ?
                        <BlockRenderer Block={this.props.Blocks[0]} UpdatePage={this.updatePage} /> :
                        ''
                    }
                </Col>
            </Row>
        );
    }
}