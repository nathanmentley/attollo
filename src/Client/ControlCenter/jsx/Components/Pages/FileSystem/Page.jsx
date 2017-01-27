import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import AssetService from '../../../Services/AssetService.jsx';

import FileUtils from '../../../Utils/FileUtils.jsx';

import FileList from './FileList.jsx';

export default class FileSystemPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            Files: []
        };

        this.addNewFile = this.addNewFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    componentDidMount() {
        AssetService.GetDirectoryListing()
            .then((result) => {
                this.setState({ Files: result.data.data });
            });
    }

    addNewFile() {
        FileUtils.GetFile()
            .then((result) => {
                AssetService.AddAsset(result.filename, result.content)
                    .then(() => {
                        AssetService.GetDirectoryListing()
                            .then((result) => {
                                this.setState({ Files: result.data.data });
                            });
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            });
    }

    deleteFile(file) {
        AssetService.DeleteAsset(file)
            .then(() => {
                AssetService.GetDirectoryListing()
                    .then((result) => {
                        this.setState({ Files: result.data.data });
                    });
            });
    }

    _render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <FileList Files={this.state.Files} DeleteFile={this.deleteFile} />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewFile}>
                            <Glyphicon glyph="plus" /> Upload File
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}