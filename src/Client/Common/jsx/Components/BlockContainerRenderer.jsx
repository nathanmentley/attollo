import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from './BaseComponent.jsx';

import OneCol from './BlockContainers/OneCol.jsx';
import TwoCol from './BlockContainers/TwoCol.jsx';
import ThreeCol from './BlockContainers/ThreeCol.jsx';
import FourCol from './BlockContainers/FourCol.jsx';

export default class BlockContainerRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Blocks: []
        };

        this.updatePage = this.updatePage.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        this.props.BlockService.GetBlocks(this.props.BlockContainer.id).then((blockResult) => {
            self.setState({
                Blocks: blockResult.data.data
            }); 
        });
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }
    
    render() {
        var self = this;
        var blockContainerContent = (<Row />);

        switch(this.props.BlockContainer.BlockContainerDef.code) {
            case 'OneCol':
                blockContainerContent = (
                    <OneCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.state.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                );
                break;
            case 'TwoCol':
                blockContainerContent = (
                    <TwoCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.state.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                );
                break;
            case 'ThreeCol':
                blockContainerContent = (
                    <ThreeCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.state.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                );
                break;
            case 'FourCol':
                blockContainerContent = (
                    <FourCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.state.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                    />
                );
                break;
        }

        return blockContainerContent;
    }
}