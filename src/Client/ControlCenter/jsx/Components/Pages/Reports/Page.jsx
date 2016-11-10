import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

import BasePage from '../BasePage.jsx';

export default class ReportsPage extends BasePage {
    _render() {
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
                        <Line data={data} />
                    </Col>

                    <Col xs={12} md={6}>
                        <Line data={data} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Doughnut data={data} />
                    </Col>

                    <Col xs={12} md={6}>
                        <Bar data={data} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}