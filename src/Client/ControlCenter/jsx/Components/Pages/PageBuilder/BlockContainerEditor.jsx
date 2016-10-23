import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

import BlockService from '../../../Services/BlockService.jsx';

import BlockList from './BlockList.jsx';

export default class BlockContainerEditor extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Blocks: []
        };
    }

    componentDidMount() {
        var self = this;

        BlockService.GetBlocks(this.props.BlockContainer.id).then((res) => {
            self.setState({ Blocks: res.data.data }); 
        });
    }

    render() {
        return (
            <div>
                <BlockList Blocks={this.state.Blocks} SetEditingBlock={this.props.SetEditingBlock} />
            </div>
        );
    }
}