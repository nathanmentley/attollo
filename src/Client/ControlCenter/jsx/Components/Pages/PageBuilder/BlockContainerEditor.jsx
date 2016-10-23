import React from 'react';

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
            <BlockContainerRenderer
                BlockContainer={this.props.BlockContainer}
                BlockRenderer={BlockRenderer}
                BlockService={BlockService}
                UpdatePage={self.updatePage}
            />
        );
    }
}