import React from 'react';
import { browserHistory } from 'react-router';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class FileList extends BaseComponent {
    constructor(props) {
        super(props);

        this.deleteFile = this.deleteFile.bind(this);
    }

    deleteFile(file) {
        this.props.DeleteFile(file);
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
                        this.props.Files.map((x) => {
                            return (
                                <tr key={x}>
                                    <td>{x}</td>
                                    <td>
                                        <DropdownButton title={<Glyphicon glyph="cog" />} id={x + '-action-button'}>
                                            <MenuItem eventKey="1" onClick={() => { self.deleteFile(x); }}>
                                                <Glyphicon glyph="pencil" /> Delete
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