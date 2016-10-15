import React from 'react';
import { browserHistory } from 'react-router';

import SiteService from '../../../Services/SiteService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Sites: []
        };
    }
    
    componentDidMount() {
        var self = this;

        SiteService.GetSites().then((res) => {
            self.setState({ Sites: res.data.data }); 
        });
    }

    GoToPageBin(siteId) {
        browserHistory.push("/Pages/" + siteId);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.state.Sites.map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={function() { self.GoToPageBin(x.id); }}>{x.name}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}