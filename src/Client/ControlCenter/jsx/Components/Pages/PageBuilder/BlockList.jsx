import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import Block from './Block.jsx';

export default class BlockDefList extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <Row>
                {
                    this.props.Blocks.map((x) => {
                        return (
                            <Col key={x.id} xs={4} md={4}>
                                <Block Block={x} PlaceBlock={this.props.PlaceBlock} />
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}