import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import PageUtils from '../../../../../Common/jsx/Utils/PageUtils.jsx';

export default class SiteVersionList extends BaseComponent {
    constructor(props) {
        super(props);

        this.publish = this.publish.bind(this);
	    this.goToPageBin = this.goToPageBin.bind(this);
	    this.setEditingSiteVersion = this.setEditingSiteVersion.bind(this);
        this.export = this.export.bind(this);
        this.clone = this.clone.bind(this);
    }

    publish(siteVersionId) {
        if(this.props.Publish) {
            this.props.Publish(siteVersionId);
        }
    }

    goToPageBin(siteVersionId) {
        PageUtils.ChangePage("/Sites/" + this.props.SiteID + "/" + siteVersionId);
    }

	setEditingSiteVersion(siteVersion) {
		this.props.SetEditingSiteVersion(siteVersion);
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
                        <th>Theme</th>
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
                                    <td>{x.Theme.name}</td>
                                    <td >
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.publish(x.id); }}>
                                                <Glyphicon glyph="ok" /> Publish
                                            </MenuItem>
                                            <MenuItem eventKey="1" onClick={() => { self.setEditingSiteVersion(x); }}>
                                                <Glyphicon glyph="pencil" /> Edit
                                            </MenuItem>
                                            <MenuItem eventKey="1" onClick={() => { self.goToPageBin(x.id); }}>
                                                <Glyphicon glyph="pencil" /> Edit Pages
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