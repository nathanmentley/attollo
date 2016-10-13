import React from 'react';
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

    login(event) {
        var self = this;

        AuthService.PostAuth(this.state.username, this.state.password)
        .then((resp) => {
            if(resp.data.error) {
                self.setState({ message: resp.data.data.message });
            }else{
                AjaxService.SetAuth(self.state.username, self.state.password);

                if (self.props.location && self.props.location.state && self.props.location.state.nextPathname) {
                    browserHistory.push(self.props.location.state.nextPathname);
                } else {
                    browserHistory.push('/Main');
                }
            }
        }).catch((err) => {
            self.setState({ message: resp.data.data.message });
        });
    }

    render() {
        return (
            <div>
                <div>{this.state.message}</div>
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