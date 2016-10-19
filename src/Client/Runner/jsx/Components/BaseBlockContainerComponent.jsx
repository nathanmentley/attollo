import React from 'react';

import BaseComponent from './BaseComponent.jsx';

export default class BaseBlockContainerComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(url) {
        this.props.UpdatePage(url);
    }
}