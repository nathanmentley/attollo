import React from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import { DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockRendererSource = {
    beginDrag(props) {
        return {
            BlockID: props.Block.id
        };
    },
    endDrag(props, monitor, component) {
        var target = monitor.getDropResult();
        var source = props.Block;

        if(props.MoveBlock && target && source) {
            props.MoveBlock(target.BlockContainerID, target.AreaCode, source.id);
        }
    }
}

const BlockRendererTarget = {
    drop(props) {
        return {
            BlockContainerID: props.BlockContainer.id,
            AreaCode: props.AreaCode
        };
    }
}

function dropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

function dropBlockCollect(connect, monitor) {
    return {
        connectBlockDropTarget: connect.dropTarget(),
        isBlockOver: monitor.isOver()
    }
}

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DropTarget("BlockDef", BlockRendererTarget, dropCollect)(
    DropTarget("Block", BlockRendererTarget, dropBlockCollect)(
        DragSource("Block", BlockRendererSource, dragCollect)(
            class BlockRenderer extends BaseComponent {
                constructor(props) {
                    super(props);

                    this.state = {};
                }

                render() {
                    const { connectDropTarget, isOver, connectBlockDropTarget, isBlockOver, connectDragSource, isDragging } = this.props;

                    if(this.props.Block) {
                        return connectDragSource(
                            <div className="block-node" style={
                                { 
                                    opacity: isDragging ? 0.5 : 1
                                }
                            }>
                                <p className="block-node-title">
                                    {this.props.Block.title}
                                </p>

                                <div className="pull-right">
                                    <DropdownButton
                                        title={<Glyphicon glyph="cog" />}
                                        id={this.props.Block.id + '-action-button'}
                                    >
                                        <MenuItem eventKey="1" onClick={() => {  }}>
                                            <Glyphicon glyph="pencil" /> Edit
                                        </MenuItem>
                                    </DropdownButton>
                                </div>
                            </div>
                        );
                    }else{
                        return connectDropTarget(
                            connectBlockDropTarget(
                                <div className="block-empty-node" style={
                                    { 
                                        backgroundColor: isOver || isBlockOver ? 'yellow' : 'inherit'
                                    }
                                }>
                                    <Glyphicon glyph="arrow-down" /> empty
                                </div>
                            )
                        );
                    }
                }
            }
        )
    )
);