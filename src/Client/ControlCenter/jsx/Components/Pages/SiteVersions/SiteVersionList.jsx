import React from 'react';
import { browserHistory } from 'react-router';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import SiteVersionProvisionService from '../../../Services/SiteVersionProvisionService.jsx';

export default class SiteVersionList extends BaseComponent {
    constructor(props) {
        super(props);

        this.publish = this.publish.bind(this);
        this.goToPageBin = this.goToPageBin.bind(this);
        this.export = this.export.bind(this);
        this.clone = this.clone.bind(this);
    }

    publish(siteVersionId) {
        if(this.props.Publish) {
            this.props.Publish(siteVersionId);
        }
    }

    goToPageBin(siteVersionId) {
        browserHistory.push("/Sites/" + this.props.SiteID + "/" + siteVersionId);
    }

    export(siteVersionId) {
        if(this.props.Export) {
            this.props.Export(siteVersionId);
        }
    }

    clone(siteVersionId) {
        if(this.props.Clone) {
            this.props.Clone(siteVersionId);
        }
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Version</th>
                        <th>Status</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.SiteVersions.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.SiteVersionStatus.name}</td>
                                    <td >
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.publish(x.id); }}>
                                                <Glyphicon glyph="ok" /> Publish
                                            </MenuItem>
                                            <MenuItem eventKey="1" onClick={() => { self.goToPageBin(x.id); }}>
                                                <Glyphicon glyph="pencil" /> Edit
                                            </MenuItem>
                                            <MenuItem eventKey="1" onClick={() => { self.export(x.id); }}>
                                                <Glyphicon glyph="cloud-download" /> Export
                                            </MenuItem>
                                            <MenuItem eventKey="1" onClick={() => { self.clone(x.id); }}>
                                                <Glyphicon glyph="asterisk" /> Clone
                                            </MenuItem>
                                        </DropdownButton>
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