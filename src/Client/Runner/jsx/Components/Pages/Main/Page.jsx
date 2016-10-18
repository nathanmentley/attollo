import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import PageService from '../../../Services/PageService.jsx';
import BlockService from '../../../Services/BlockService.jsx';

import BlockRenderer from './BlockRenderer.jsx';

export default class MainPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            Pages: [],
            Page: null,
            Blocks: []
        };

        this.updatePage = this.updatePage.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        PageService.GetPages().then((res) => {
            var page = res.data.data.find((x) => { return x.url == window.location.pathname; });

            if(!page){
                page = res.data.data[0];
            }

            BlockService.GetBlocks(page.id).then((blockResult) => {
                self.setState({
                    Pages: res.data.data,
                    Page: page,
                    Blocks: blockResult.data.data
                }); 
            });
        });
    }

    updatePage(url) {
        var self = this;
        var page = this.state.Pages.find((x) => { return x.url == url; });

        if(!page){
            page = this.state.Pages[0];
        }

        BlockService.GetBlocks(page.id).then((blockResult) => {
            self.setState({
                Page: page,
                Blocks: blockResult.data.data
            }); 
        });
    }

    render() {
        var self = this;

        if(this.state.Page == null) {
            return (<Grid/>);
        }else{
            return (
                <BlockRenderer Blocks={this.state.Blocks} UpdatePage={this.updatePage} />
            );
        }
    }
}