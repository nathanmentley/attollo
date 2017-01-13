import React from 'react';

import BaseComponent from './BaseComponent.jsx';

export default class BaseBlockContainerComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
        this.getBlockForAreaCode = this.getBlockForAreaCode.bind(this);
    }

    getBlockForAreaCode(code) {
        var area = this.props.BlockContainer.BlockContainerAreas.find((x) => {
            return x.BlockContainerAreaDef.code == code
        });

        if(area && area.BlockContainerAreaInstances.length) {
            if(area.BlockContainerAreaInstances[0].Block) {
                return area.BlockContainerAreaInstances[0].Block;
            }
        }

        return null;
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }
}