import React from 'react';

import BaseComponent from '../../BaseComponent.jsx';

import BlockAreaList from './BlockAreaList.jsx';

export default class BlockContainerList extends BaseComponent {
    constructor(props) {
        super(props);
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
                    this.props.BlockContainers.sort((a, b) => a.displayorder - b.displayorder).map((x) => {
                        return (
                            <div key={x.id}>
                                <BlockAreaList BlockAreas={x.blockareas} SetEditingBlock={this.props.SetEditingBlock} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}