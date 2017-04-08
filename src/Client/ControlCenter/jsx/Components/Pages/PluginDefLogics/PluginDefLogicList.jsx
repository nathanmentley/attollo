import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class PluginDefLogicList extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.PluginDefLogics.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}