import React from 'react';
import { browserHistory } from 'react-router';

import SiteService from '../../../Services/SiteService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToPageBin = this.goToPageBin.bind(this);
        this.setEditingSite = this.setEditingSite.bind(this);
    }

    goToPageBin(siteId) {
        browserHistory.push("/Pages/" + siteId);
    }

    setEditingSite(site) {
        this.props.SetEditingSite(site);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.Sites.map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={() => { self.setEditingSite(x); }}>{x.name}</a>
                                <span> - </span>
                                <a onClick={() => { self.goToPageBin(x.id); }}>edit</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}