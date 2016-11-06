import React from 'react';
import { Grid, Row, Col, Breadcrumb, Alert } from 'react-bootstrap';

import ObjectUtils from '../../Utils/ObjectUtils.jsx';

import BaseComponent from '../BaseComponent.jsx';

import AjaxService from '../../Services/AjaxService.jsx';

import Header from '../Layout/Header.jsx';
import Footer from '../Layout/Footer.jsx';

export default class BasePage extends BaseComponent {
    constructor(props) {
        super(props);

        this.setBreadCrumbs = this.setBreadCrumbs.bind(this);
        this.setPageTitle = this.setPageTitle.bind(this);

        this.addAlert = this.addAlert.bind(this);
        this.removeAlert = this.removeAlert.bind(this);

        this._render = this._render.bind(this);
    }

    setBreadCrumbs(crumbs, callBack) {
        this.setState({ BreadCrumbs: crumbs }, callBack);
    }

    setPageTitle(title, callBack) {
        this.setState({ PageTitle: title }, callBack);
    }

    addAlert(style, title, content) {
        var alerts = [];
        if(this.state && this.state.Alerts) {
            alerts = ObjectUtils.Clone(this.state.Alerts);
        }

        alerts.push({ Style: style, Title: title, Content: content });

        this.setState({ Alerts: alerts });
    }

    removeAlert(alert) {
        var alerts = ObjectUtils.Clone(this.state.Alerts);

        alerts.splice(alerts.indexOf(alert), 1);

        this.setState({ Alerts: alerts });
    }

    _render() {
        return <Grid />;
    }

    render() {
        var self = this;

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <Header IsAuthenticated={AjaxService.IsAuthenticated()} />
                    </Col>
                </Row>

                <Grid className="app-router">
                    <Row className="page-row">
                        <Col xs={12} md={12} className="page-content">
                            {
                                (this.state && this.state.Alerts) ?
                                    this.state.Alerts.map((x) => {
                                        return (
                                            <Row key={self.state.Alerts.indexOf(x)}>
                                                <Col xs={12} md={12} className="page-title">
                                                    <Alert bsStyle={x.Style} onDismiss={() => { self.removeAlert(x) }}>
                                                        <div>
                                                            <h4>{x.Title}</h4>
                                                            <p>{x.Content}</p>
                                                        </div>
                                                    </Alert>
                                                </Col>
                                            </Row>
                                        );
                                    }) :
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
                                this._render()
                            }
                        </Col>
                    </Row>
                </Grid>

                <Row>
                    <Col xs={12} md={12}>
                        <Footer IsAuthenticated={AjaxService.IsAuthenticated()} />
                    </Col>
                </Row>
            </div>
        );
    }
}