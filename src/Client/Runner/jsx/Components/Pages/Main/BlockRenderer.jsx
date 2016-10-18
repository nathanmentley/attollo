import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import HtmlBlock from '../../Blocks/Html.jsx';
import OtherBlock from '../../Blocks/Other.jsx';
import SitePagesBlock from '../../Blocks/SitePages.jsx';

export default class BlockRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderBlock = this.renderBlock.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }

    renderBlock(block) {
        var blockContent = (<Col />);

        switch(block.BlockDef.code) {
            case 'Html':
                blockContent = (<HtmlBlock Block={block} UpdatePage={this.updatePage} />);
                break;
            case 'Other':
                blockContent = (<OtherBlock Block={block} UpdatePage={this.updatePage} />);
                break;
            case 'SitePages':
                blockContent = (<SitePagesBlock Block={block} UpdatePage={this.updatePage} />);
                break;
        }

        return (
            <Row key={block.id}>
                {blockContent}
            </Row>
        );
    }

    render() {
        var self = this;

        return (
            <Grid>
                {
                    this.props.Blocks.map((x) => {
                        return self.renderBlock(x);
                    })
                }
            </Grid>
        );
    }
}