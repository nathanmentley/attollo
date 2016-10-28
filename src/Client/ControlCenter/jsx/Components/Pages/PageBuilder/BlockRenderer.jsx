import React from 'react';
import { DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var blockContent = (
            <div className="block-empty-node">
                empty
            </div>
        );

        if(this.props.Block) {
            blockContent = (
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
        }

        return blockContent;
    }
}