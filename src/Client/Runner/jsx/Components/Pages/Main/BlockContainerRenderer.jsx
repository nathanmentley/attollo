import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import BlockService from '../../../Services/BlockService.jsx';

import OneCol from '../../BlockContainers/OneCol.jsx';
import TwoCol from '../../BlockContainers/TwoCol.jsx';
import ThreeCol from '../../BlockContainers/ThreeCol.jsx';
import FourCol from '../../BlockContainers/FourCol.jsx';

export default class BlockContainerRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Blocks: []
        };

        this.updatePage = this.updatePage.bind(this);
        this.sortBlocks = this.sortBlocks.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        BlockService.GetBlocks(this.props.BlockContainer.id).then((blockResult) => {
            self.setState({
                Blocks: self.sortBlocks(blockResult.data.data)
            }); 
        });
    }

    sortBlocks(blocks){
        return blocks.sort((a, b) => a.displayorder - b.displayorder);
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }
    
    render() {
        var self = this;
        var blockContainerContent = (<Row />);

        switch(this.props.BlockContainer.BlockContainerDef.code) {
            case 'OneCol':
                blockContainerContent = (<OneCol Blocks={self.state.Blocks} UpdatePage={this.updatePage} />);
                break;
            case 'TwoCol':
                blockContainerContent = (<TwoCol Blocks={self.state.Blocks} UpdatePage={this.updatePage} />);
                break;
            case 'ThreeCol':
                blockContainerContent = (<ThreeCol Blocks={self.state.Blocks} UpdatePage={this.updatePage} />);
                break;
            case 'FourCol':
                blockContainerContent = (<FourCol Blocks={self.state.Blocks} UpdatePage={this.updatePage} />);
                break;
        }

        return blockContainerContent;
    }
}