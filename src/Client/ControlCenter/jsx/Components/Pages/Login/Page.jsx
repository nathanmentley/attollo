import React from 'react';

import axios from 'axios';

import Config from '!json!../../../config.json';

export default class AboutPage extends React.Component {
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
        alert(this.state.username + " " + this.state.password);
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.username} onChange={this.updateUsername} />
                </div>
                <div>
                    <input type="text" value={this.state.password} onChange={this.updatePassword} />
                </div>
                <div>
                    <div className="btn btn-primary" onClick={this.login}>login</div>
                </div>
            </div>
        );
    }
}