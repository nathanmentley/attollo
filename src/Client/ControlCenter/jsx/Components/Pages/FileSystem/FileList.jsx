import React from 'react';
import { Table, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class FileList extends BaseComponent {
    constructor(props) {
        super(props);

        this.deleteFile = this.deleteFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    deleteFile(file) {
        this.props.DeleteFile(file);
    }

    downloadFile(file) {
        this.props.DownloadFile(file);
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
                                            <MenuItem eventKey="2" onClick={() => { self.downloadFile(x); }}>
                                                <Glyphicon glyph="pencil" /> Download
                                            </MenuItem>
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