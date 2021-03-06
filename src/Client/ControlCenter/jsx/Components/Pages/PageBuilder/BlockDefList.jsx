import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import BlockDef from './BlockDef.jsx';

export default class BlockDefList extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <Row>
                {
                    this.props.BlockDefs.map((x) => {
                        return (
                            <Col key={x.code} xs={4} md={4}>
                                <BlockDef BlockDef={x} AddBlock={this.props.AddBlock} />
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}