import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import BaseComponent from '../../BaseComponent.jsx';

import BlockContainerEditor from './BlockContainerEditor.jsx';

export default DragDropContext(HTML5Backend)(
    class BlockContainerList extends BaseComponent {
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
                                <BlockContainerEditor key={x.id} BlockContainer={x} />
                            );
                        })
                    }
                    <div className="block-container-def-target">
                        <span>Drop Layout Here</span>
                    </div>
                </div>
            );
        }
    }
);