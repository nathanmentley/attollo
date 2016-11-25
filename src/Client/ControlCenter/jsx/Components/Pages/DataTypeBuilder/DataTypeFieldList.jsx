import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeFieldList extends BaseComponent {
    constructor(props) {
        super(props);

        this.setEditingDataTypeField = this.setEditingDataTypeField.bind(this);
    }

    setEditingDataTypeField(dataType) {
        this.props.SetEditingDataTypeField(dataType);
    }

    render() {
        var self = this;

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
                        this.props.DataTypeFields.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.setEditingDataTypeField(x); }}>
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