import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import Routing from './Config/Routing.jsx';

import Header from './Components/Layout/Header.jsx';
import Footer from './Components/Layout/Footer.jsx';

render(
    (
        <Grid>
            <Row>
                <Col xs={1} md={2} />

                <Col xs={10} md={8} >
                    <Header />

                    <Row className="content">
                        <Col xs={12} md={12} >
                            <Routing />
                        </Col>
                    </Row>

                    <Footer />
                </Col>

                <Col xs={1} md={2} />
            </Row>
        </Grid>
    ),
    document.getElementById('app-container')
);