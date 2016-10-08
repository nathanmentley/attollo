import React from 'react';

import BaseAuthPage from '../BaseAuthPage.jsx';
import AjaxService from '../../../Services/AjaxService.jsx';

export default class AboutPage extends BaseAuthPage {
    constructor(props) {
        super(props);

        this.state = {
            pages: [{}, {}]
        };
    }

    componentDidMount() {
        var self = this;

        var url = '/pages';
        var body = {};
        var headers = {};

        AjaxService.Get(url, body, headers)
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