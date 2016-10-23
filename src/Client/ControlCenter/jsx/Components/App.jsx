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
            <Grid className="app-router">
                <Header IsAuthenticated={this.state.IsAuthenticated} />

                <Row className="page-row">
                    <Col xs={12} md={12} className="page-content">
                        <Routing />
                    </Col>
                </Row>

                <Footer IsAuthenticated={this.state.IsAuthenticated} />
            </Grid>
        );
    }
}