import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import PageService from '../../../Services/PageService.jsx';
import BlockService from '../../../Services/BlockService.jsx';
import BlockContainerService from '../../../Services/BlockContainerService.jsx';

import BlockContainerRenderer from '../../../../../Common/jsx/Components/BlockContainerRenderer.jsx';
import BlockRenderer from './BlockRenderer.jsx';

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
    
    componentDidMount() {
        var self = this;

        PageService.GetPages().then((res) => {
            var page = res.data.data.find((x) => { return x.url == window.location.pathname; });

            if(!page){
                page = res.data.data[0];
            }

            BlockContainerService.GetBlockContainers(page.id).then((blockResult) => {
                self.setState({
                    Pages: res.data.data,
                    Page: page,
                    BlockContainers: blockResult.data.data
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
                    {this.state.BlockContainers.map((x) => {
                        return <BlockContainerRenderer
                            key={x.id}
                            BlockContainer={x}
                            BlockRenderer={BlockRenderer}
                            BlockService={BlockService}
                            UpdatePage={self.updatePage}
                        />
                    })}
                </Grid>
            );
        }
    }
}