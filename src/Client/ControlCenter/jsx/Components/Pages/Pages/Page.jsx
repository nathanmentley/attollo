import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import PageService from '../../../Services/PageService.jsx';
import PageDefService from '../../../Services/PageDefService.jsx';

import PageList from './PageList.jsx';
import PageEditor from './PageEditor.jsx';
import PageCreator from './PageCreator.jsx';

export default class PagesPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingPage: null,
            CreatingPage: null,
            Pages: [],
            PageDefs: []
        };

        this.setEditingPage = this.setEditingPage.bind(this);
        this.updateEditingPageTitle = this.updateEditingPageTitle.bind(this);
        this.updateEditingPageUrl = this.updateEditingPageUrl.bind(this);

        this.savePage = this.savePage.bind(this);
        this.deletePage = this.deletePage.bind(this);

        this.updateCreatingPageTitle = this.updateCreatingPageTitle.bind(this);
        this.updateCreatingPageUrl = this.updateCreatingPageUrl.bind(this);
        this.updatePageDef = this.updatePageDef.bind(this);

        this.createPage = this.createPage.bind(this);

        this.addNewPage = this.addNewPage.bind(this);
        this.closePageCreator = this.closePageCreator.bind(this);
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

        PageDefService.GetPageDefs().then((res) => {
            self.setState({ PageDefs: res.data.data });
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

    updateCreatingPageTitle(title) {
        var newPage = ObjectUtils.Clone(this.state.CreatingPage);
        newPage.title = title;
        this.setState({ CreatingPage: newPage });
    }

    updateCreatingPageUrl(url) {
        var newPage = ObjectUtils.Clone(this.state.CreatingPage);
        newPage.url = url;
        this.setState({ CreatingPage: newPage });
    }

    updatePageDef(pageDefId) {
        var newPage = ObjectUtils.Clone(this.state.CreatingPage);
        newPage.pagedefid = pageDefId;
        this.setState({ CreatingPage: newPage });
    }

    createPage() {
        var self = this;

        PageService.AddPage(this.state.CreatingPage).then((addRes) => {
            PageService.GetPages(this.props.params.SiteVersionID).then((res) => {
                self.setState({ Pages: res.data.data, CreatingPage: null }); 
            });
        });
    }

    addNewPage() {
        this.setState({
            CreatingPage: {
                url: '',
                title: '',
                pagedefid: 1,
                siteversionid: this.props.params.SiteVersionID
            }
        });
    }

    closePageCreator() {
        this.setState({ CreatingPage: null });
    }

    _render() {
        var editingPage = <div />;
        if(this.state.EditingPage != null){
            editingPage = <PageEditor
                Page={this.state.EditingPage}
                UpdateTitle={this.updateCreatingPageTitle}
                UpdateUrl={this.updateEditingPageUrl}
                SavePage={this.savePage}
                DeletePage={this.deletePage}
                SetEditingPage={this.setEditingPage}
            />;
        }

        var creatingPage = <div />;
        if(this.state.CreatingPage != null){
            creatingPage = <PageCreator
                PageDefs={this.state.PageDefs}
                Page={this.state.CreatingPage}
                UpdateTitle={this.updateCreatingPageTitle}
                UpdateUrl={this.updateCreatingPageUrl}
                UpdatePageDef={this.updatePageDef}
                CreatePage={this.createPage}
                ClosePageCreator={this.closePageCreator}
            />
        }

        return (
            <div>
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
                    {creatingPage}
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewPage}>
                            <Glyphicon glyph="plus" /> Add New Page
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}