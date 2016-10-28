import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'react-bootstrap';

import ObjectUtils from '../../Utils/ObjectUtils.jsx';

import BaseComponent from '../BaseComponent.jsx';

export default class BasePage extends BaseComponent {
    constructor(props) {
        super(props);

        this.setBreadCrumbs = this.setBreadCrumbs.bind(this);
        this.setPageTitle = this.setPageTitle.bind(this);
        this._render = this._render.bind(this);
    }

    setBreadCrumbs(crumbs, callBack) {
        this.setState({ BreadCrumbs: crumbs }, callBack);
    }

    setPageTitle(title, callBack) {
        this.setState({ PageTitle: title }, callBack);
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

                {
                    (this.state && this.state.PageTitle) ?
                    <Row>
                        <Col xs={12} md={12} className="page-title">
                            <h1>{this.state.PageTitle}</h1>
                        </Col>
                    </Row> :
                    ""
                }

                {this._render()}
            </Grid>
        );
    }
}