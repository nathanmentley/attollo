import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.setEditingDataType = this.setEditingDataType.bind(this);
        this.goToDataTypeBuilder = this.goToDataTypeBuilder.bind(this);
    }

    setEditingDataType(dataType) {
        this.props.SetEditingDataType(dataType);
    }

    goToDataTypeBuilder(dataTypeDefID) {
        this.goToPage("/DataTypeDefs/" + this.props.PluginDefID + "/" + dataTypeDefID);
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
                        this.props.DataTypeDefs.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td onClick={() => { self.goToDataTypeBuilder(x.id); }}>{x.name}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.setEditingDataType(x); }}>
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