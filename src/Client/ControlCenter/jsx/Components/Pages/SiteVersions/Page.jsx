import React from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import SiteVersionService from '../../../Services/SiteVersionService.jsx';
import SiteVersionProvisionService from '../../../Services/SiteVersionProvisionService.jsx';

import SiteVersionList from './SiteVersionList.jsx';

export default class SiteVersionsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            SiteVersions: []
        };

        this.publish = this.publish.bind(this);
        this.export = this.export.bind(this);
        this.clone = this.clone.bind(this);
    }

    componentDidMount() {
        var self = this;

        self.setPageTitle("Site Versions", () => {
            SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
                self.setState({ SiteVersions: res.data.data }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        },
                        {
                            title: "Sites",
                            url: "/Sites"
                        }
                    ]);
                });
            });
        });
    }

    publish(siteVersionId) {
        alert(siteVersionId);
    }

    import() {
        alert("import");
    }

    export(siteVersionId) {
        SiteVersionProvisionService.ExportSiteVersion(siteVersionId).then((res) => {
            alert(JSON.stringify(res.data.data));
        });
    }

    clone(siteVersionId) {
        var self = this;

        SiteVersionProvisionService.CloneSiteVersion(siteVersionId, this.props.params.SiteID).then((res) => {
            SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
                self.setState({ SiteVersions: res.data.data });
            });
        });
    }

    _render() {
        return (
            <div>
                <Row>
                    <Button bsStyle="primary" onClick={this.import}><Glyphicon glyph="cloud-upload" /> Import</Button>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <SiteVersionList
                            SiteVersions={this.state.SiteVersions}
                            SiteID={this.props.params.SiteID}
                            Publish={this.publish}
                            Export={this.export}
                            Clone={this.clone}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}