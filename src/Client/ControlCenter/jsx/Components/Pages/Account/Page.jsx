import React from 'react';
import { Grid, Row, Col, Glyphicon, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import UserService from '../../../Services/UserService.jsx';

export default class AccountPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            User: {},
            password: '',
            password2: ''
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePassword2 = this.updatePassword2.bind(this);
        this.save = this.save.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        self.setPageTitle("Account", () => {
            UserService.GetUsers().then((res) => {
                self.setState({ User: res.data.data[0] }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        }
                    ]);
                }); 
            });
        });
    }

    updateUsername(e) {
        var newUser = ObjectUtils.Clone(this.state.User);
        newUser.name = e.target.value;

        this.setState({ User: newUser });
    }

    updatePassword(e) {
        this.setState({ password: e.target.value });
    }

    updatePassword2(e) {
        this.setState({ password2: e.target.value });
    }

    save() {
        this.addAlert("danger",
            "Could not save. :(",
            "Account page isn't functional yet."
        );
    }

    _render() {
        return (
            <div className="account-page-root">
                <Row>
                    <Col xs={12} md={12}>
                        <Row>
                            <Col xs={12} md={12}>
                                <FormGroup
                                    controlId="username"
                                >
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.User.username}
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
                                <FormGroup
                                    controlId="password"
                                >
                                    <ControlLabel>Repeat Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password2}
                                        placeholder="Repeat Password"
                                        onChange={this.updatePassword2}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Button bsStyle="primary" onClick={this.save}>Save</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}