import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.addBlock = this.addBlock.bind(this);
    }

    addBlock(code) {
        this.props.AddNewBlock(code);
    }

    render() {
        var self = this;

        return (
            <Row>
                {
                    this.props.BlockDefs.map((x) => {
                        return (
                            <Col key={x.code} xs={4} md={4}>
                                <div className="block-def-node" onClick={() => {self.addBlock(x.code)} }>
                                    {x.name}
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}