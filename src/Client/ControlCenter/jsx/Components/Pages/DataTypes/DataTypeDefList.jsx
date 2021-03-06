import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToDataTypeBuilder = this.goToDataTypeBuilder.bind(this);
    }

    goToDataTypeBuilder(dataType) {
        this.goToPage("/DataTypes/" + dataType.id);
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Plugin</th>
                        <th>Name</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.DataTypeDefs.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.PluginDef.name}</td>
                                    <td>{x.name}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.goToDataTypeBuilder(x); }}>
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