import React from 'react';
import { DragSource } from 'react-dnd';
import { Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockSource = {
    beginDrag(props) {
        return {
            BlockID: props.Block.id
        };
    },
    endDrag(props, monitor, component) {
        var target = monitor.getDropResult();
        var source = props.Block;

        if(props.PlaceBlock && target && source) {
            props.PlaceBlock(target.BlockContainerID, target.AreaCode, source.id);
        }
    }
}

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource("Block", BlockSource, dragCollect)(
    class Block extends BaseComponent {
        constructor(props) {
            super(props);
        }

        render() {
            var self = this;
            const { connectDragSource, isDragging } = this.props;

            return connectDragSource(
                <div className="existing-block-node" style={
                    { 
                        opacity: isDragging ? 0.5 : 1,
                    }
                }>
                    <Glyphicon glyph="magnet" /> {this.props.Block.title}
                </div>
            );
        }
    }
);