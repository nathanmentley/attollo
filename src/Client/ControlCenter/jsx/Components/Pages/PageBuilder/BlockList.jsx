import React from 'react';

import BlockService from '../../../Services/BlockService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Blocks: []
        };
    }
    
    componentDidMount() {
        var self = this;

        BlockService.GetBlocks(this.props.PageID).then((res) => {
            self.setState({ Blocks: res.data.data }); 
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.Blocks.map((x) => {
                        return (
                            <div key={x.id}>block</div>
                        );
                    })
                }
            </div>
        );
    }
}