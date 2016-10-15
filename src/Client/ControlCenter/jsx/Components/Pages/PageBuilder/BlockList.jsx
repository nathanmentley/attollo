import React from 'react';

import BlockService from '../../../Services/BlockService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            EditingBlock: null,
            Blocks: []
        };
    }
    
    componentDidMount() {
        var self = this;

        BlockService.GetBlocks(this.props.PageID).then((res) => {
            self.setState({ Blocks: res.data.data }); 
        });
    }

    editBlock(id) {
        this.setState({EditingBlock: this.state.Blocks.find((x) => { return x.id === id; })});
    }

    render() {
        var self = this;
        
        return (
            <div>
                <div style={{display: (this.state.EditingBlock != null ? 'inherit' : 'none')}}>
                    {this.state.EditingBlock != null ? this.state.EditingBlock.template : ''}
                </div>
                {
                    this.state.Blocks.map((x) => {
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