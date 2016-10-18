import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import SiteService from '../../../Services/SiteService.jsx';

import SiteList from './SiteList.jsx';
import SiteEditor from './SiteEditor.jsx';

export default class SitesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingSite: null,
            Sites: []
        };

        this.setEditingSite = this.setEditingSite.bind(this);
        this.updateEditingSiteName = this.updateEditingSiteName.bind(this);
        this.updateEditingSiteDomain = this.updateEditingSiteDomain.bind(this);

        this.addNewSite = this.addNewSite.bind(this);
        this.saveSite = this.saveSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        SiteService.GetSites().then((res) => {
            self.setState({ Sites: res.data.data }); 
        });
    }

    setEditingSite(site) {
        this.setState({ EditingSite: ObjectUtils.Clone(site) });
    }

    updateEditingSiteName(name) {
        var newSite = ObjectUtils.Clone(this.state.EditingSite);
        newSite.name = name;
        this.setState({ EditingSite: newSite });
    }

    updateEditingSiteDomain(domain) {
        var newSite = ObjectUtils.Clone(this.state.EditingSite);
        newSite.domain = domain;
        this.setState({ EditingSite: newSite });
    }

    saveSite() {
        var self = this;

        SiteService.SaveSite(this.state.EditingSite).then((saveResult) => {
            SiteService.GetSites().then((getResult) => {
                self.setState({ Sites: getResult.data.data }, () => {
                    //self.setEditingSite(*somehow get update Site*);
                }); 
            });
        });
    }

    deleteSite() {
        var self = this;

        SiteService.DeleteSite(this.state.EditingSite.id).then((saveResult) => {
            SiteService.GetSites().then((getResult) => {
                self.setState({ Sites: getResult.data.data, EditingSite: null }); 
            });
        });
    }

    addNewSite() {
        var self = this;

        SiteService.AddSite().then((addRes) => {
            SiteService.GetSites().then((res) => {
                self.setState({ Sites: res.data.data }); 
            });
        });
    }

    render() {
        var editingSite = <div />;
        if(this.state.EditingSite != null){
            editingSite = <SiteEditor
                Site={this.state.EditingSite}
                UpdateName={this.updateEditingSiteName}
                UpdateDomain={this.updateEditingSiteDomain}
                SaveSite={this.saveSite}
                DeleteSite={this.deleteSite}
            />;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <div className="btn btn-primary" onClick={this.addNewSite}>Add New Site</div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={3}>
                        <SiteList Sites={this.state.Sites} SetEditingSite={this.setEditingSite} />
                    </Col>

                    <Col xs={12} md={9}>
                        {editingSite}
                    </Col>
                </Row>
            </Grid>
        );
    }
}