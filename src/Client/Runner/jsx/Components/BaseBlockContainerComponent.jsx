import React from 'react';

import BaseComponent from './BaseComponent.jsx';

export default class BaseBlockContainerComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
        this.getBlockForAreaCode = this.getBlockForAreaCode.bind(this);
    }

    getBlockForAreaCode(code) {
        return this.props.Blocks.find((x) => {
            return x.BlockContainerArea.BlockContainerAreaDef.code == code;
        });
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }
}