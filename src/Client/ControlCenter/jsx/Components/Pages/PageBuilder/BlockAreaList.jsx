import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockAreaList extends BaseComponent {
    constructor(props) {
        super(props);

        this.editBlock = this.editBlock.bind(this);
    }

    editBlock(id) {
        this.props.SetEditingBlock(this.props.Blocks.find((x) => { return x.id === id; }));
    }

    render() {
        var self = this;

        if(this.props.Target == null) {
            return (
                <div>
                    No Layout Selected.
                </div>
            );
        }

        return (
            <div>
                {
                    this.props.Blocks.sort((a, b) => a.displayorder - b.displayorder).map((x) => {
                        return (
                            <div key={x.id}>
                                <a onClick={() => { self.editBlock(x.id); }}>{x.title}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}