import React from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import { DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockRendererSource = {
    beginDrag(props) {
        return {
            BlockID: props.BlockContainerAreaInstance.Block.id
        };
    },
    endDrag(props, monitor, component) {
        var target = monitor.getDropResult();
        var source = props.BlockContainerAreaInstance;

        if(props.MoveBlock && target && source) {
            props.MoveBlock(target.BlockContainerID, target.AreaCode, source);
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

                }

                setEditingBlock() {
                    if(this.props.SetEditingBlock) {
                        this.props.SetEditingBlock(this.props.BlockContainerAreaInstance.Block);
                    }
                }

                setEditingSettingsBlock() {
                    if(this.props.SetEditingSettingsBlock) {
                        this.props.SetEditingSettingsBlock(this.props.BlockContainerAreaInstance.Block);
                    }
                }

                setEditingStyleBlock() {
                    if(this.props.SetEditingStyleBlock) {
                        this.props.SetEditingStyleBlock(this.props.BlockContainerAreaInstance.Block);
                    }
                }

                render() {
                    var self = this;
                    const { connectDropTarget, isOver, connectBlockDropTarget, isBlockOver, connectDragSource, isDragging } = this.props;

                    if(this.props.BlockContainerAreaInstance && this.props.BlockContainerAreaInstance.Block) {
                        return connectDragSource(
                            <div className="block-node" style={
                                { 
                                    opacity: isDragging ? 0.5 : 1
                                }
                            }>
                                <p className="block-node-title">
                                    {this.props.BlockContainerAreaInstance.Block.title}
                                </p>

                                <div className="pull-right">
                                    <DropdownButton
                                        title={<Glyphicon glyph="cog" />}
                                        id={this.props.BlockContainerAreaInstance.Block.id + '-block-action-button'}
                                    >
                                        <MenuItem eventKey="1" onClick={() => { self.setEditingBlock(); }}>
                                            <Glyphicon glyph="pencil" /> Edit Block
                                        </MenuItem>
                                        <MenuItem eventKey="1" onClick={() => { self.setEditingSettingsBlock(); }}>
                                            <Glyphicon glyph="cog" /> Update Settings
                                        </MenuItem>
                                        <MenuItem eventKey="1" onClick={() => { self.setEditingStyleBlock(); }}>
                                            <Glyphicon glyph="text-background" /> Update Style
                                        </MenuItem>
                                        <MenuItem eventKey="1" onClick={() => {  }}>
                                            <Glyphicon glyph="trash" /> Delete
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