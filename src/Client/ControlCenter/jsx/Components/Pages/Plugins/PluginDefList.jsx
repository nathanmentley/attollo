import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefList extends BaseComponent {
    constructor(props) {
        super(props);
        this.goToDataTypeDefs = this.goToDataTypeDefs.bind(this);
    }

    goToDataTypeDefs(pluginDef) {
        this.goToPage("/DataTypeDefs/" + pluginDef.id);
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
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.PluginDefs.filter((x) => { return x.clientid != null; }).map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.code}</td>
                                    <td>{x.name}</td>
                                    <td>{x.description}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog"/>} id={x.id + '-action-button'}>
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="1">
                                                        <Glyphicon glyph="blackboard"/> Edit Themes
                                                    </MenuItem> :
                                                    ""
                                            }
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="2">
                                                        <Glyphicon glyph="scale"/> Edit Widget Types
                                                    </MenuItem> :
                                                    ""
                                            }
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="3" onClick={() => {
                                                        self.goToDataTypeDefs(x);
                                                    }}>
                                                        <Glyphicon glyph="briefcase"/> Edit Data Types
                                                    </MenuItem> :
                                                    ""
                                            }
                                            {
                                                x.clientid != null ?
                                                    <MenuItem eventKey="4">
                                                        <Glyphicon glyph="tasks"/> Edit Logic Overrides
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