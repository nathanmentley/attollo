import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseBlockContainerComponent from '../BaseBlockContainerComponent.jsx';

export default class TwoCol extends BaseBlockContainerComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        
        return (
            <Row>
                <Col xs={12} md={6}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        BlockContainerAreaInstance={self.getBlockContainerAreaInstanceForAreaCode('First')}
                        AreaCode={'First'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                        SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                        SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                        TemplateProcessor={self.props.TemplateProcessor}
                        DataTypes={self.props.DataTypes}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <this.props.BlockRenderer
                        BlockContainer={self.props.BlockContainer}
                        BlockContainerAreaInstance={self.getBlockContainerAreaInstanceForAreaCode('Second')}
                        AreaCode={'Second'}
                        UpdatePage={this.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                        SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                        SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                        TemplateProcessor={self.props.TemplateProcessor}
                        DataTypes={self.props.DataTypes}
                    />
                </Col>
            </Row>
        );
    }
}