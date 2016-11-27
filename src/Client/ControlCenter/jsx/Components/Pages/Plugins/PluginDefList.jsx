import React from 'react';
import { browserHistory } from 'react-router';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.IsPluginEnabled = this.IsPluginEnabled.bind(this);
    }

    IsPluginEnabled(pluginDef) {
        return this.props.Plugins.some((x) => { return x.PluginDef.code == pluginDef.code; });
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Enabled</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.PluginDefs.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.code}</td>
                                    <td>{x.name}</td>
                                    <td>{x.description}</td>
                                    <td>{self.IsPluginEnabled(x) ? 'Yes' : 'No'}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1">
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