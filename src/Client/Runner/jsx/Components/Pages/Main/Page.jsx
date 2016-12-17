import React from "react";
import {Grid, Row, Col} from "react-bootstrap";

import BasePage from "../BasePage.jsx";
import PageService from "../../../Services/PageService.jsx";
import BlockService from "../../../Services/BlockService.jsx";
import BlockContainerService from "../../../Services/BlockContainerService.jsx";
import BlockContainerRenderer from "../../../../../Common/jsx/Components/BlockContainerRenderer.jsx";
import BlockRenderer from "./BlockRenderer.jsx";

export default class MainPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            Pages: [],
            Page: null,
            BlockContainers: []
        };

        this.updatePage = this.updatePage.bind(this);
    }

    componentWillMount() {
        if (this.props.Pages != null && this.props.BlockContainers != null && this.props.Page != null) {
            this.setState({
                Pages: this.props.Pages,
                Page: this.props.Page,
                BlockContainers: this.props.BlockContainers
            });
        } else if(window && window.__ATTOLLO_INITIAL_STATE__) {
            this.setState({
                Pages: window.__ATTOLLO_INITIAL_STATE__.Pages,
                Page: window.__ATTOLLO_INITIAL_STATE__.Page,
                BlockContainers: window.__ATTOLLO_INITIAL_STATE__.BlockContainers
            });
        }
    }

    componentDidMount() {
        //if server side rendering failed lets load client side.
        var self = this;

        if(this.state.Page == null) {
            PageService.GetPages().then((res) => {
                self.setState({Pages: res.data.data}, () => {
                    self.updatePage(window.location.pathname)
                });
            });
        }
    }

    updatePage(url) {
        var self = this;
        var page = this.state.Pages.find((x) => { return x.url == url; });

        if(!page){
            page = this.state.Pages[0];
        }

        BlockContainerService.GetBlockContainers(page.id).then((blockResult) => {
            self.setState({
                Page: page,
                BlockContainers: blockResult.data.data
            }); 
        });
    }

    render() {
        var self = this;

        if(this.state.Page == null) {
            return (<Grid/>);
        }else{
            return (
                <Grid>
                    {this.state.BlockContainers.sort((a, b) => a.displayorder - b.displayorder).map((x) => {
                        return <BlockContainerRenderer
                            key={x.id}
                            BlockContainer={x}
                            BlockRenderer={BlockRenderer}
                            BlockService={BlockService}
                            UpdatePage={self.updatePage}
                            TemplateProcessor={self.props.TemplateProcessor}
                        />
                    })}
                </Grid>
            );
        }
    }
}