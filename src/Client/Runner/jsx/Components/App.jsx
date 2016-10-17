import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Routing from '../Config/Routing.jsx';

import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var self = this;
    }

    render() {
        return(
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
        );
    }
}