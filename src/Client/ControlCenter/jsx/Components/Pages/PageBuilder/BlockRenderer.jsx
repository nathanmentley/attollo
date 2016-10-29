import React from 'react';
import { DropTarget } from 'react-dnd';
import { DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

const BlockRendererTarget = {
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
export default DropTarget("BlockDef", BlockRendererTarget, dropCollect)(
    class BlockRenderer extends BaseComponent {
        constructor(props) {
            super(props);

            this.state = {};
        }

        render() {
            const { connectDropTarget, isOver } = this.props;

            if(this.props.Block) {
                return (
                    <div className="block-node">
                        <DropdownButton
                                title={<Glyphicon glyph="cog" />}
                                id={this.props.Block.id + '-action-button'}
                        >
                            <MenuItem eventKey="1" onClick={() => {  }}>
                                <Glyphicon glyph="pencil" /> Edit
                            </MenuItem>
                        </DropdownButton>

                        <p className="block-node-title">
                            {this.props.Block.title}
                        </p>

                        <Glyphicon glyph="move" className="pull-right" />
                    </div>
                );
            }else{
                return connectDropTarget(
                    <div className="block-empty-node" style={
                        { 
                            backgroundColor: isOver ? 'yellow' : 'inherit'
                        }
                    }>
                        <Glyphicon glyph="arrow-down" /> empty
                    </div>
                );
            }
        }
    }
);