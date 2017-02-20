import React from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import FileUtils from '../../../Utils/FileUtils.jsx';
import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import SiteVersionService from '../../../Services/SiteVersionService.jsx';
import SiteVersionProvisionService from '../../../Services/SiteVersionProvisionService.jsx';
import SiteVersionPublishService from '../../../Services/SiteVersionPublishService.jsx';
import ThemeService from '../../../Services/ThemeService.jsx';

import SiteVersionList from './SiteVersionList.jsx';
import SiteVersionEditor from './SiteVersionEditor.jsx';

export default class SiteVersionsPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            SiteVersions: [],
            Themes: [],
	        EditingSiteVersion: null
        };

        this.publish = this.publish.bind(this);
        this.import = this.import.bind(this);
        this.export = this.export.bind(this);
        this.clone = this.clone.bind(this);

	    this.updateEditingTheme = this.updateEditingTheme.bind(this);
	    this.saveSiteVersion = this.saveSiteVersion.bind(this);
	    this.deleteSiteVersion = this.deleteSiteVersion.bind(this);
	    this.setEditingSiteVersion = this.setEditingSiteVersion.bind(this);
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

            ThemeService.GetThemes().then((res) => {
	            self.setState({ Themes: res.data.data });
            });
        });
    }

    publish(siteVersionId) {
        SiteVersionPublishService.PublishSiteVersion(siteVersionId)
            .then(() => {
                SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
                    this.setState({ SiteVersions: res.data.data });
                });
            });
    }

    import() {
        FileUtils.GetFile()
            .then((result) => {
                SiteVersionProvisionService.ImportSiteVersion(JSON.parse(atob(result.content)), this.props.params.SiteID)
                    .then(() => {
                        SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
                            this.setState({ SiteVersions: res.data.data });
                        });
                    });
            });
    }

    export(siteVersionId) {
        SiteVersionProvisionService.ExportSiteVersion(siteVersionId).then((res) => {
            FileUtils.GenerateDownload(
                "export_siteversion_" + siteVersionId + ".attollo",
                JSON.stringify(res.data.data)
            );
        });
    }

    clone(siteVersionId) {
        SiteVersionProvisionService.CloneSiteVersion(siteVersionId, this.props.params.SiteID).then(() => {
            SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
                this.setState({ SiteVersions: res.data.data });
            });
        });
    }

	updateEditingTheme(themeId) {
        var newVersion = ObjectUtils.Clone(this.state.EditingSiteVersion);
        newVersion.themeid = themeId;
		this.setState({ EditingSiteVersion: newVersion });
	}

	saveSiteVersion() {
		SiteVersionService.UpdateSiteVersion(this.state.EditingSiteVersion).then(() => {
			SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
				this.setState({ SiteVersions: res.data.data, EditingSiteVersion: null });
			});
		});
	}

	deleteSiteVersion() {
        SiteVersionService.DeleteSiteVersion(this.state.EditingSiteVersion.id).then(() => {
	        SiteVersionService.GetSiteVersions(this.props.params.SiteID).then((res) => {
		        this.setState({ SiteVersions: res.data.data, EditingSiteVersion: null });
	        });
        });
	}

	setEditingSiteVersion(siteVersion) {
        this.setState({ EditingSiteVersion: siteVersion });
	}

    _render() {
	    var editingSiteVersion = <div />;
	    if(this.state.EditingSiteVersion != null){
		    editingSiteVersion = <SiteVersionEditor
                SiteVersion={this.state.EditingSiteVersion}
                UpdateTheme={this.updateEditingTheme}
                SaveSiteVersion={this.saveSiteVersion}
                DeleteSiteVersion={this.deleteSiteVersion}
                SetEditingSiteVersion={this.setEditingSiteVersion}
                Themes={this.state.Themes}
            />;
	    }

	    return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <SiteVersionList
                            SiteVersions={this.state.SiteVersions}
                            SiteID={this.props.params.SiteID}
                            Publish={this.publish}
                            Export={this.export}
                            Clone={this.clone}
                            SetEditingSiteVersion={this.setEditingSiteVersion}
                        />
                    </Col>

	                {editingSiteVersion}
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <Button bsStyle="primary" className="pull-right" onClick={this.import}>
                            <Glyphicon glyph="cloud-upload" /> Import
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}