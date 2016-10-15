import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockEditor extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.Block.template}
            </div>
        );
    }
}