import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'react-bootstrap';

import ObjectUtils from '../../Utils/ObjectUtils.jsx';

import BaseComponent from '../BaseComponent.jsx';

export default class BasePage extends BaseComponent {
    constructor(props) {
        super(props);

        this.setBreadCrumbs = this.setBreadCrumbs.bind(this);
        this._render = this._render.bind(this);
    }

    setBreadCrumbs(crumbs) {
        this.setState({ BreadCrumbs: crumbs });
    }

    _render() {
        return <Grid />;
    }

    render() {
        var self = this;

        return (
            <Grid>
                {
                    (this.state && this.state.BreadCrumbs && this.state.BreadCrumbs.length) ? 
                        <Row>
                            <Col xs={12} md={12} className="page-bread-crumbs">
                                <Breadcrumb>
                                    {
                                        this.state.BreadCrumbs.map((x) => {
                                            return (
                                                <Breadcrumb.Item
                                                    key={x.url}
                                                    onClick={() => { self.goToPage(x.url); } }
                                                >
                                                    {x.title}
                                                </Breadcrumb.Item>
                                            );
                                        })
                                    }
                                </Breadcrumb>
                            </Col>
                        </Row> :
                        ""
                }

                {this._render()}
            </Grid>
        );
    }
}