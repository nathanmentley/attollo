import React from 'react';
import { browserHistory } from 'react-router';
import { Table } from 'react-bootstrap';

import SiteService from '../../../Services/SiteService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToSiteVersionBin = this.goToSiteVersionBin.bind(this);
        this.setEditingSite = this.setEditingSite.bind(this);
    }

    goToSiteVersionBin(siteId) {
        browserHistory.push("/SiteVersions/" + siteId);
    }

    setEditingSite(site) {
        this.props.SetEditingSite(site);
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.Sites.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td onClick={() => { self.goToSiteVersionBin(x.id); }}>{x.name}</td>
                                    <td onClick={() => { self.goToSiteVersionBin(x.id); }}>{x.domain}</td>
                                    <td onClick={() => { self.setEditingSite(x); }}>
                                        edit
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}