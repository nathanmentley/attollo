import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockContainerDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.addBlockContainer = this.addBlockContainer.bind(this);
    }

    addBlockContainer(code) {
        this.props.AddNewBlockContainer(code);
    }

    render() {
        var self = this;

        return (
            <Row>
                {
                    this.props.BlockContainerDefs.map((x) => {
                        return (
                            <Col key={x.code} xs={4} md={4}>
                                <div className="block-container-def-node" onClick={() => {self.addBlockContainer(x.code)} }>
                                    {x.title}
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}