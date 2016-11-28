import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class DataTypeDefList extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Plugin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.DataTypeDefs.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.name}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}