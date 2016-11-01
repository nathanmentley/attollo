import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../../../../Common/jsx/Components/BaseComponent.jsx';

import HtmlBlock from '../../Blocks/Html.jsx';
import OtherBlock from '../../Blocks/Other.jsx';
import SitePagesBlock from '../../Blocks/SitePages.jsx';

export default class BlockRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {};

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }

    render() {
        var blockContent = (<div />);

        if(this.props.Block) {
            switch(this.props.Block.BlockDef.code) {
                case 'Html':
                    blockContent = (<HtmlBlock Block={this.props.Block} UpdatePage={this.updatePage} />);
                    break;
                case 'Other':
                    blockContent = (<OtherBlock Block={this.props.Block} UpdatePage={this.updatePage} />);
                    break;
                case 'SitePages':
                    blockContent = (<SitePagesBlock Block={this.props.Block} UpdatePage={this.updatePage} />);
                    break;
            }
        } else {
            return (<div />);
        }

        return ( 
            <div id={this.props.Block.id}>
                {blockContent}
            </div>
        );
    }
}