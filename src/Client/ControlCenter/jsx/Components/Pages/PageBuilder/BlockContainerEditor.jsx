import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import BlockService from '../../../Services/BlockService.jsx';

import BlockContainerRenderer from '../../../../../Common/jsx/Components/BlockContainerRenderer.jsx';
import BlockRenderer from './BlockRenderer.jsx';

export default class BlockContainerEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage() { }

    render() {
        return (
            <div className="block-container-node">
                <Glyphicon glyph="move" className="pull-right" />
                
                <h6>
                    {this.props.BlockContainer.BlockContainerDef.title}
                </h6>
                <BlockContainerRenderer
                    BlockContainer={this.props.BlockContainer}
                    BlockRenderer={BlockRenderer}
                    BlockService={BlockService}
                    UpdatePage={self.updatePage}
                />
            </div>
        );
    }
}