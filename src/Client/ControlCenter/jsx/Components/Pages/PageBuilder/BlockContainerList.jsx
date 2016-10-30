import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

import BlockContainerEditor from './BlockContainerEditor.jsx';
import BlockContainerDefTarget from './BlockContainerDefTarget.jsx';

export default class BlockContainerList extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        var self = this;
        return (
            <div>
                {
                    this.props.BlockContainers.sort((a, b) => a.displayorder - b.displayorder).map((x) => {
                        return (
                            <BlockContainerEditor
                                key={x.id}
                                BlockContainer={x}
                                SwapBlockContainers={self.props.SwapBlockContainers}
                                MoveBlock={self.props.MoveBlock}
                            />
                        );
                    })
                }
                <BlockContainerDefTarget />
            </div>
        );
    }
}