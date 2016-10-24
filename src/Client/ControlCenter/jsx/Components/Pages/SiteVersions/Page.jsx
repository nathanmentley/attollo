import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import SiteVersionService from '../../../Services/SiteVersionService.jsx';

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
    }

    _render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <SiteVersionList SiteVersions={this.state.SiteVersions} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}