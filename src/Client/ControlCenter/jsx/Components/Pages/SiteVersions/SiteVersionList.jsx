import React from 'react';
import { browserHistory } from 'react-router';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class SiteVersionList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToPageBin = this.goToPageBin.bind(this);
    }

    goToPageBin(siteVersionId) {
        browserHistory.push("/Sites/" + this.props.SiteID + "/" + siteVersionId);
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Version</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.SiteVersions.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td onClick={() => { self.goToPageBin(x.id); }}>{x.id}</td>
                                    <td >
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.goToPageBin(x.id); }}>
                                                <Glyphicon glyph="pencil" /> Edit
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