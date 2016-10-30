import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import BlockContainerDef from './BlockContainerDef.jsx';

export default class BlockContainerDefList extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <Row>
                {
                    this.props.BlockContainerDefs.map((x) => {
                        return (
                            <Col key={x.code} xs={4} md={4}>
                                <BlockContainerDef BlockContainerDef={x} AddBlockContainer={this.props.AddBlockContainer} />
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}