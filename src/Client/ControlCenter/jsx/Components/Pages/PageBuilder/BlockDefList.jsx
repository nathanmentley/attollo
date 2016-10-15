import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.addBlock = this.addBlock.bind(this);
    }

    addBlock(code) {
        this.props.AddNewBlock(code);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.BlockDefs.map((x) => {
                        return (
                            <div key={x.code}>
                                <a onClick={() => {self.addBlock(x.code)}}>{x.name}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}