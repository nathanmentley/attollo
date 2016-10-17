import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BasePage from '../BasePage.jsx';

import PageService from '../../../Services/PageService.jsx';
import BlockService from '../../../Services/BlockService.jsx';

import HtmlBlock from '../../Blocks/Html.jsx';
import OtherBlock from '../../Blocks/Other.jsx';

export default class MainPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            Pages: [],
            Page: null,
            Blocks: []
        };
    }
    
    componentDidMount() {
        var self = this;

        PageService.GetPages().then((res) => {
            BlockService.GetBlocks(res.data.data[0].id).then((blockResult) => {
                self.setState({
                    Pages: res.data.data,
                    Page: res.data.data[0],
                    Blocks: blockResult.data.data
                }); 
            });
        });
    }

    renderBlock(block) {
        return (
            <Row key={block.id}>
                <Col>{block.title}</Col>
            </Row>
        );
    }

    render() {
        var self = this;

        if(this.state.Page == null) {
            return (<Grid/>);
        }else{
            return (
                <Grid>
                    {
                        this.state.Blocks.map((x) => {
                            return self.renderBlock(x);
                        })
                    }
                </Grid>
            );
        }
    }
}