import React from 'react';
import { browserHistory } from 'react-router';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.isPluginEnabled = this.isPluginEnabled.bind(this);
        this.enablePlugin = this.enablePlugin.bind(this);
        this.disablePlugin = this.disablePlugin.bind(this);
        this.goToDataTypeDefs = this.goToDataTypeDefs.bind(this);
    }

    goToDataTypeDefs(pluginDef) {
        this.goToPage("/DataTypeDefs/" + pluginDef.id);
    }

    isPluginEnabled(pluginDef) {
        return this.props.Plugins.some((x) => { return x.PluginDef.code == pluginDef.code; });
    }

    enablePlugin(code) {
        if(this.props.EnablePlugin) {
            this.props.EnablePlugin(code);
        }
    }

    disablePlugin(code) {
        if(this.props.DisablePlugin) {
            var plugin = this.props.Plugins.find((x) => { return x.PluginDef.code == code; });
            if(plugin) {
                this.props.DisablePlugin(plugin.id);
            }
        }
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
                                    <td>{self.isPluginEnabled(x) ? 'Yes' : 'No'}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            {
                                                x.clientid != null ?
                                                <MenuItem eventKey="1">
                                                    <Glyphicon glyph="blackboard" /> Edit Themes
                                                </MenuItem> :
                                                ""
                                            }
                                            {
                                                x.clientid != null ?
                                                <MenuItem eventKey="2">
                                                    <Glyphicon glyph="scale" /> Edit Widget Types
                                                </MenuItem> :
                                                ""
                                            }
                                            {
                                                x.clientid != null ?
                                                <MenuItem eventKey="3" onClick={() => { self.goToDataTypeDefs(x); }}>
                                                    <Glyphicon glyph="briefcase" /> Edit Data Types
                                                </MenuItem> :
                                                ""
                                            }
                                            {
                                                x.clientid != null ?
                                                <MenuItem eventKey="4">
                                                    <Glyphicon glyph="tasks" /> Edit Logic Overrides
                                                </MenuItem> :
                                                ""
                                            }

                                            {
                                                self.isPluginEnabled(x) ?
                                                <MenuItem eventKey="5" onClick={() => { self.disablePlugin(x.code); }}>
                                                    <Glyphicon glyph="wrench" /> Disable
                                                </MenuItem> :
                                                ""
                                            }
                                            {
                                                !self.isPluginEnabled(x) ?
                                                <MenuItem eventKey="5" onClick={() => { self.enablePlugin(x.code); }}>
                                                    <Glyphicon glyph="wrench" /> Enable
                                                </MenuItem> :
                                                ""
                                            }
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