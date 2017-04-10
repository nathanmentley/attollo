import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class ThemeList extends BaseComponent {
    constructor(props) {
        super(props);

        this.setEditingTheme = this.setEditingTheme.bind(this);
    }

    setEditingTheme(theme) {
        this.props.SetEditingTheme(theme);
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.Themes.map((x) => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.code}</td>
                                    <td>{x.name}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x.id + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { this.setEditingTheme(x); }}>
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