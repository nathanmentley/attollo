import React from 'react';

import axios from 'axios';

import Config from '!json!../../../config.json';

export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [{}, {}]
        };
    }

    componentDidMount() {
        var self = this;

        var url = Config.BaseAPIURL + '/pages';
        var body = {};
        var headers = {};

        var ajax = axios.create({
            auth: {
                username: 'admin',
                password: 'password'
            }
        });

        ajax.get(url, body, headers)
            .then((res) => {  
                self.setState({ pages: res.data.data }); 
            }).catch((err)=> {
                alert(err);
            });
    }

    render() {
        return (<div>{this.state.pages.length}</div>);
    }
}