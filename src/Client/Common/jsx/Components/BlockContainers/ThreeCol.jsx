import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockContainerComponent from '../BaseBlockContainerComponent.jsx';

export default class ThreeCol extends BaseBlockContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        
        return (
            <Row>
                <Col xs={12} md={4}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('First')}
                        AreaCode={'First'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                </Col>
                <Col  xs={12} md={4}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('Second')}
                        AreaCode={'Second'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                </Col>
                <Col xs={12} md={4}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('Third')}
                        AreaCode={'Third'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                </Col>
            </Row>
        );
    }
}