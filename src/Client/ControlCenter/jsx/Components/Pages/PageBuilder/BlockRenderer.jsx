import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockRenderer extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {};

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }

    render() {
        var blockContent = (<div>No Block</div>);

        if(this.props.Block) {
            blockContent = <div>{this.props.Block.title}</div>;
        }

        return blockContent;
    }
}