import React from 'react';
import { browserHistory } from 'react-router';

import BasePage from '../BasePage.jsx';
import AjaxService from '../../../Services/AjaxService.jsx';

export default class AboutPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    login(event) {
        AjaxService.SetAuth(this.state.username, this.state.password);
        browserHistory.push('/PageBuilder');
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.username} onChange={this.updateUsername} placeholder="username" />
                </div>
                <div>
                    <input type="password" value={this.state.password} onChange={this.updatePassword} placeholder="password" />
                </div>
                <div>
                    <div className="btn btn-primary" onClick={this.login}>login</div>
                </div>
            </div>
        );
    }
}