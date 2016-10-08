import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Routing from '../Config/Routing.jsx';

import AjaxService from '../Services/AjaxService.jsx';

import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsAuthenticated: false
        };
    }

    componentDidMount() {
        var self = this;
        
        AjaxService.OnAuthenticate(() => {
            self.setState({ IsAuthenticated: true });
        });
        AjaxService.OnUnauthenticate(() => {
            self.setState({ IsAuthenticated: false });
        });
    }

    render() {
        return(
            <Grid>
                <Row>
                    <Col xs={1} md={2} />

                    <Col xs={10} md={8} >
                        <Header IsAuthenticated={this.state.IsAuthenticated} />

                        <Row className="content">
                            <Col xs={12} md={12} >
                                <Routing />
                            </Col>
                        </Row>

                        <Footer IsAuthenticated={this.state.IsAuthenticated} />
                    </Col>

                    <Col xs={1} md={2} />
                </Row>
            </Grid>
        );
    }
}