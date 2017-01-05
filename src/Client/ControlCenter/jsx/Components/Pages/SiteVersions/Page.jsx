import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

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

    Export(siteVersionId) {
        SiteVersionProvisionService.ExportSiteVersion(siteVersionId).then((res) => {
            alert(JSON.stringify(res.data.data));
        });
    }

    _render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <SiteVersionList SiteVersions={this.state.SiteVersions} SiteID={this.props.params.SiteID} Export={this.Export} />
                    </Col>
                </Row>
            </div>
        );
    }
}