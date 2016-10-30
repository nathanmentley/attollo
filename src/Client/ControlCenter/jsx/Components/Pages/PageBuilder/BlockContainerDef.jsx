import React from 'react';
import { DragSource } from 'react-dnd';
import { Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockContainerDefSource = {
    beginDrag(props) {
        return {
            BlockContainerDefCode: props.BlockContainerDef.code
        };
    },
    endDrag(props, monitor, component) {
        var source = props.BlockContainerDef;

        if(props.AddBlockContainer && source) {
            props.AddBlockContainer(source.code);
        }
    }
}

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource("BlockContainerDef", BlockContainerDefSource, dragCollect)(
    class BlockContainerDef extends BaseComponent {
        constructor(props) {
            super(props);
        }

        render() {
            var self = this;
            const { connectDragSource, isDragging } = this.props;

            return connectDragSource(
                <div className="block-container-def-node" style={
                    { 
                        opacity: isDragging ? 0.5 : 1,
                    }
                }>
                    <Glyphicon glyph="equalizer" /> {this.props.BlockContainerDef.title}
                </div>
            );
        }
    }
);