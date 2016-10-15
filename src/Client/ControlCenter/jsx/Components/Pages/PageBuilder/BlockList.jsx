import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockList extends BaseComponent {
    constructor(props) {
        super(props);

        this.editBlock = this.editBlock.bind(this);
    }

    editBlock(id) {
        this.props.SetEditingBlock(this.props.Blocks.find((x) => { return x.id === id; }));
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.Blocks.map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={() => { self.editBlock(x.id); }}>{x.name}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}