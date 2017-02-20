import React from 'react';
import { Glyphicon, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import RightClickMenu from '../../Shared/RightClickMenu.jsx';

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
            <Row>
                {
                    this.props.Files.map((x) => {
                        return (
                            <Col key={x} xs={12} sm={6} md={3}>
                                <RightClickMenu Items={[
                                    {
                                        content: <span><Glyphicon glyph="pencil" /> Download</span>,
                                        logic: () => { self.downloadFile(x); }
                                    },
                                    {
                                        content: <span><Glyphicon glyph="pencil" /> Delete</span>,
                                        logic: () => { self.deleteFile(x); }
                                    }
                                ]}>
                                    {x}
                                </RightClickMenu>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}