import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import PageService from '../../../Services/PageService.jsx';

import PageList from './PageList.jsx';
import PageEditor from './PageEditor.jsx';

export default class PagesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingPage: null,
            Pages: []
        };

        this.setEditingPage = this.setEditingPage.bind(this);
        this.updateEditingPageTitle = this.updateEditingPageTitle.bind(this);
        this.updateEditingPageUrl = this.updateEditingPageUrl.bind(this);

        this.addNewPage = this.addNewPage.bind(this);
        this.savePage = this.savePage.bind(this);
        this.deletePage = this.deletePage.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        self.setPageTitle("Pages", () => {
            PageService.GetPages(this.props.params.SiteVersionID).then((res) => {
                self.setState({ Pages: res.data.data }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        },
                        {
                            title: "Sites",
                            url: "/Sites"
                        },
                        {
                            title: "Site Versions",
                            url: "/Sites/" + this.props.params.SiteVersionID
                        }
                    ]);
                });
            });
        });
    }

    setEditingPage(page) {
        if(page) {
            this.setState({ EditingPage: ObjectUtils.Clone(page) });
        } else {
            this.setState({ EditingPage: null });
        }
    }

    updateEditingPageTitle(title) {
        var newPage = ObjectUtils.Clone(this.state.EditingPage);
        newPage.title = title;
        this.setState({ EditingPage: newPage });
    }

    updateEditingPageUrl(url) {
        var newPage = ObjectUtils.Clone(this.state.EditingPage);
        newPage.url = url;
        this.setState({ EditingPage: newPage });
    }

    savePage() {
        var self = this;

        PageService.SavePage(this.state.EditingPage).then((saveResult) => {
            PageService.GetPages(this.props.params.SiteVersionID).then((getResult) => {
                self.setState({ Pages: getResult.data.data, EditingPage: null }, () => {
                    //self.setEditingPage(*somehow get update page*);
                }); 
            });
        });
    }

    deletePage() {
        var self = this;

        PageService.DeletePage(this.state.EditingPage.id).then((saveResult) => {
            PageService.GetPages(this.props.params.SiteVersionID).then((getResult) => {
                self.setState({ Pages: getResult.data.data, EditingPage: null }); 
            });
        });
    }

    addNewPage() {
        var self = this;

        PageService.AddPage(this.props.params.SiteVersionID).then((addRes) => {
            PageService.GetPages(this.props.params.SiteVersionID).then((res) => {
                self.setState({ Pages: res.data.data }); 
            });
        });
    }

    _render() {
        var editingPage = <div />;
        if(this.state.EditingPage != null){
            editingPage = <PageEditor
                Page={this.state.EditingPage}
                UpdateTitle={this.updateEditingPageTitle}
                UpdateUrl={this.updateEditingPageUrl}
                SavePage={this.savePage}
                DeletePage={this.deletePage}
                SetEditingPage={this.setEditingPage}
            />;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <PageList
                            Pages={this.state.Pages}
                            SetEditingPage={this.setEditingPage}
                            SiteID={this.props.params.SiteID}
                            SiteVersionID={this.props.params.SiteVersionID}
                        />
                    </Col>
                    
                    {editingPage}
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewPage}>
                            <Glyphicon glyph="plus" /> Add New Page
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}