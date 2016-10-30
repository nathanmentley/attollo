import React from 'react';
import { DragSource } from 'react-dnd';
import { Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockDefSource = {
    beginDrag(props) {
        return {
            BlockDefID: props.BlockDef.id
        };
    },
    endDrag(props, monitor, component) {
        var target = monitor.getDropResult();
        var source = props.BlockDef;

        if(props.AddBlock && target && source) {
            props.AddBlock(target.BlockContainerID, target.AreaCode, source.code);
        }
    }
}

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource("BlockDef", BlockDefSource, dragCollect)(
    class BlockDef extends BaseComponent {
        constructor(props) {
            super(props);
        }

        render() {
            var self = this;
            const { connectDragSource, isDragging } = this.props;

            return connectDragSource(
                <div className="block-def-node" style={
                    { 
                        opacity: isDragging ? 0.5 : 1,
                    }
                }>
                    <Glyphicon glyph="flash" /> {this.props.BlockDef.name}
                </div>
            );
        }
    }
);