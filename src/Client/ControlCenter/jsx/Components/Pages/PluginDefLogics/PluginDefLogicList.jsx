import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefLogicList extends BaseComponent {
    constructor(props) {
        super(props);

        this.setEditingPluginDefLogic = this.setEditingPluginDefLogic.bind(this);
    }

	setEditingPluginDefLogic(logic) {
        this.props.SetEditingPluginDefLogic(logic);
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.PluginDefLogics.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.title}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { this.setEditingPluginDefLogic(x); }}>
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