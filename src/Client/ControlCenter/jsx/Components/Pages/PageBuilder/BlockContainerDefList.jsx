import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockContainerDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.addBlockContainer = this.addBlockContainer.bind(this);
    }

    addBlockContainer(code) {
        this.props.AddNewBlockContainer(code);
    }

    render() {
        var self = this;

        return (
            <div>
                {
                    this.props.BlockContainerDefs.map((x) => {
                        return (
                            <div key={x.code}>
                                <a onClick={() => {self.addBlockContainer(x.code)}}>{x.title}</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}