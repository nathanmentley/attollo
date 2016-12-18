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

        this.updatePage = this.updatePage.bind(this);
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
                        Blocks={self.props.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                        SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                        SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                        TemplateProcessor={self.props.TemplateProcessor}
                        DataTypes={self.props.DataTypes}
                    />
                );
                break;
            case 'TwoCol':
                blockContainerContent = (
                    <TwoCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.props.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                        SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                        SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                        TemplateProcessor={self.props.TemplateProcessor}
                        DataTypes={self.props.DataTypes}
                    />
                );
                break;
            case 'ThreeCol':
                blockContainerContent = (
                    <ThreeCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.props.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                        SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                        SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                        TemplateProcessor={self.props.TemplateProcessor}
                        DataTypes={self.props.DataTypes}
                    />
                );
                break;
            case 'FourCol':
                blockContainerContent = (
                    <FourCol
                        BlockRenderer={self.props.BlockRenderer}
                        BlockContainer={self.props.BlockContainer}
                        Blocks={self.props.Blocks}
                        UpdatePage={self.updatePage}
                        MoveBlock={self.props.MoveBlock}
                        SetEditingBlock={self.props.SetEditingBlock}
                        SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                        SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                        TemplateProcessor={self.props.TemplateProcessor}
                        DataTypes={self.props.DataTypes}
                    />
                );
                break;
        }

        return ( 
            <div data-block-container-id={this.props.BlockContainer.id}>
                {blockContainerContent}
            </div>
        );
    }
}