import React from 'react';

import BlockDefService from '../../../Services/BlockDefService.jsx';

import BaseComponent from '../../BaseComponent.jsx';

export default class BlockDefList extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            BlockDefs: []
        };
    }
    
    componentDidMount() {
        var self = this;

        BlockDefService.GetBlockDefs().then((res) => {
            self.setState({ BlockDefs: res.data.data }); 
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.BlockDefs.map((x) => {
                        return (
                            <div key={x.code}>{x.name} - {x.code}</div>
                        );
                    })
                }
            </div>
        );
    }
}