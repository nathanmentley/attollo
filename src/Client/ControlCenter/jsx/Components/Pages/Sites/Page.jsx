import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import SiteService from '../../../Services/SiteService.jsx';
import ThemeService from '../../../Services/ThemeService.jsx';

import SiteList from './SiteList.jsx';
import SiteEditor from './SiteEditor.jsx';

export default class SitesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingSite: null,
            Themes: [],
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

        self.setPageTitle("Sites", () => {
            SiteService.GetSites().then((res) => {
                self.setState({ Sites: res.data.data }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        }
                    ]);
                });
            });
            ThemeService.GetThemes().then((res) => {
                self.setState({ Themes: res.data.data });
            });
        });
    }

    setEditingSite(site) {
        if(site) {
            this.setState({ EditingSite: ObjectUtils.Clone(site) });
        } else {
            this.setState({ EditingSite: null });
        }
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
                self.setState({ Sites: getResult.data.data, EditingSite: null }, () => {
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

        SiteService.AddSite(this.state.Themes[0].code).then((addRes) => {
            SiteService.GetSites().then((res) => {
                self.setState({ Sites: res.data.data }); 
            });
        });
    }

    _render() {
        var editingSite = <div />;
        if(this.state.EditingSite != null){
            editingSite = <SiteEditor
                Site={this.state.EditingSite}
                UpdateName={this.updateEditingSiteName}
                UpdateDomain={this.updateEditingSiteDomain}
                SaveSite={this.saveSite}
                DeleteSite={this.deleteSite}
                SetEditingSite={this.setEditingSite}
            />;
        }

        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <SiteList Sites={this.state.Sites} SetEditingSite={this.setEditingSite} />
                    </Col>

                    {editingSite}
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewSite}>
                            <Glyphicon glyph="plus" /> Add New Site
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}