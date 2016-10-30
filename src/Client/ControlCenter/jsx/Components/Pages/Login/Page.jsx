import React from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import BasePage from '../BasePage.jsx';
import AjaxService from '../../../Services/AjaxService.jsx';
import AuthService from '../../../Services/AuthService.jsx';

export default class AboutPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: ''
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.getUsernameValidation = this.getUsernameValidation.bind(this);
        this.getPasswordValidation = this.getPasswordValidation.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        AjaxService.ClearAuth();
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    getUsernameValidation() {
        const length = this.state.username.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    getPasswordValidation() {
        const length = this.state.password.length;
        if (length > 0) {
            return 'success';
        } else {
            return 'error';
        }
    }

    login(event) {
        var self = this;

        AuthService.PostAuth(this.state.username, this.state.password)
        .then((resp) => {
            if(resp.data.error) {
                self.setState({ message: resp.data.data.message });
            }else{
                AjaxService.SetAuth(resp.data.data.token);

                if (self.props.location && self.props.location.state && self.props.location.state.nextPathname) {
                    browserHistory.push(self.props.location.state.nextPathname);
                } else {
                    browserHistory.push('/Dashboard');
                }
            }
        }).catch((err) => {
            self.setState({ message: err.message });
        });
    }

    _render() {
        return (
            <Grid className="login-page-root">
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12} md={12}>
                                Welcome to Attollo.
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                Build your Web Application with our easy to use drag and drop tools.
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12} md={12}>
                                <FormGroup
                                    controlId="username"
                                >
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.username}
                                        placeholder="Username"
                                        onChange={this.updateUsername}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <FormGroup
                                    controlId="password"
                                >
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        onChange={this.updatePassword}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                {this.state.message}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Button bsStyle="primary" onClick={this.login}>Login</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}