import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

import BlockService from '../../../Services/BlockService.jsx';

import BlockContainerRenderer from '../../../../../Common/jsx/Components/BlockContainerRenderer.jsx';
import BlockRenderer from './BlockRenderer.jsx';

const BlockContainerEditorSource = {
    beginDrag(props) {
        return {
            BlockContainerID: props.BlockContainer.id
        };
    },
    endDrag(props, monitor, component) {
        var target = monitor.getDropResult();
        var source = props.BlockContainer;

        if(props.SwapBlockContainers && target && source) {
            props.SwapBlockContainers(target.id, source.id);
        }
    }
}

const BlockContainerEditorTarget = {
    drop(props) {
        return props.BlockContainer;
    }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DropTarget("BlockContainerEditor", BlockContainerEditorTarget, dropCollect)(
    DragSource("BlockContainerEditor", BlockContainerEditorSource, dragCollect)(
        class BlockContainerEditor extends BaseComponent {
            constructor(props) {
                super(props);

                this.updatePage = this.updatePage.bind(this);
            }

            updatePage() { }

            render() {
                var self = this;
                const { x, y, connectDropTarget, isOver, connectDragSource, isDragging } = this.props;

                return connectDropTarget(
                    connectDragSource(
                        <div className="block-container-node" style={
                            { 
                                opacity: isDragging ? 0.5 : 1,
                                backgroundColor: isOver ? 'yellow' : '#f0f0f0' 
                            }
                        }>
                            <h5 className="block-container-node-header">
                                {this.props.BlockContainer.BlockContainerDef.title}


                                <div className="pull-right block-container-controls">
                                    <DropdownButton
                                        title={<Glyphicon glyph="cog" />}
                                        id={this.props.BlockContainer.id + '-container-action-button'}
                                    >
                                        <MenuItem eventKey="1" onClick={() => {  }}>
                                            <Glyphicon glyph="text-background" /> Update Style
                                        </MenuItem>
                                        <MenuItem eventKey="1" onClick={() => { alert('TODO: support container deleting.'); }}>
                                            <Glyphicon glyph="trash" /> Delete
                                        </MenuItem>
                                    </DropdownButton>
                                </div>
                            </h5>
                            <BlockContainerRenderer
                                BlockContainer={this.props.BlockContainer}
                                BlockRenderer={BlockRenderer}
                                BlockService={BlockService}
                                UpdatePage={self.updatePage}
                                MoveBlock={self.props.MoveBlock}
                                SetEditingBlock={self.props.SetEditingBlock}
                                SetEditingSettingsBlock={self.props.SetEditingSettingsBlock}
                                SetEditingStyleBlock={self.props.SetEditingStyleBlock}
                            />
                        </div>
                    )
                );
            }
        }
    )
);