import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

import BasePage from '../BasePage.jsx';

export default class DashboardPage extends BasePage {
    constructor(props) {
        super(props);

        var activities = [];
        for(var i = 0; i < 50; i++) {
            activities.push({});
        }

        this.state = {
            Activities: activities
        };
    }
    
    componentDidMount() {
        var self = this; 

        self.setPageTitle("Dashboard", () => {
            self.setBreadCrumbs([
                {
                    title: "Dashboard",
                    url: "/"
                }
            ]);
        }); 
    }

    _render() {
        var self = this;

        var data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }]
        };

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12} md={12}>
                                <Line data={data} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Doughnut data={data} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Line data={data} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Doughnut data={data} />
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12} md={12} className="section-title">
                                <h2>Recent User Activity</h2>
                            </Col>
                        </Row>
                        <Row>
                            {
                                this.state.Activities.map((x) => {
                                    return (
                                        <Col xs={12} md={6} key={self.state.Activities.indexOf(x)}>
                                            <p>Someone did something.</p>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}