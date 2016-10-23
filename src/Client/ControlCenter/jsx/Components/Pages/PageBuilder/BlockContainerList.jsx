import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

import BlockService from '../../../Services/BlockService.jsx';

import BlockContainerRenderer from '../../../../../Common/jsx/Components/BlockContainerRenderer.jsx';
import BlockContainerEditor from './BlockContainerEditor.jsx';
import BlockRenderer from './BlockRenderer.jsx';

export default class BlockContainerList extends BaseComponent {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage() { }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.BlockContainers.sort((a, b) => a.displayorder - b.displayorder).map((x) => {
                        return (
                            <BlockContainerRenderer
                                key={x.id}
                                BlockContainer={x}
                                BlockRenderer={BlockRenderer}
                                BlockService={BlockService}
                                UpdatePage={self.updatePage}
                            />
                        );
                    })
                }
            </div>
        );
    }
}