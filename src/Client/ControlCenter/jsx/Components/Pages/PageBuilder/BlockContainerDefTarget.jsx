import React from 'react';
import { DropTarget } from 'react-dnd';
import { Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockContainerDefTargetTarget = {
    drop(props) {
        return {};
    }
}

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

export default DropTarget("BlockContainerDef", BlockContainerDefTargetTarget, dropCollect)(
    class BlockContainerDefTarget extends BaseComponent {
        constructor(props) {
            super(props);
        }

        render() {
            var self = this;
            const { connectDropTarget, isOver } = this.props;

            return connectDropTarget(
                <div className="block-container-def-target" style={
                    { 
                        backgroundColor: isOver ? 'yellow' : 'inherit'
                    }
                }>
                    <span><Glyphicon glyph="arrow-down" /> Drop Layout Here</span>
                </div>
            );
        }
    }
);