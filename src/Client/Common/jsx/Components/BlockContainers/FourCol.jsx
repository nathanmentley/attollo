import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockContainerComponent from '../BaseBlockContainerComponent.jsx';

export default class FourCol extends BaseBlockContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <Row>
                <Col xs={12} md={3}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('First')}
                        AreaCode={'First'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                    />
                </Col>
                <Col xs={12} md={3}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('Second')}
                        AreaCode={'Second'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                    />
                </Col>
                <Col xs={12} md={3}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('Third')}
                        AreaCode={'Third'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                    />
                </Col>
                <Col xs={12} md={3}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        Block={self.getBlockForAreaCode('Fourth')}
                        AreaCode={'Fourth'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                    />
                </Col>
            </Row>
        );
    }
}