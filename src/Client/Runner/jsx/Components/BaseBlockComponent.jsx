import React from 'react';
import { browserHistory } from 'react-router';

import BaseComponent from './BaseComponent.jsx';

export default class BaseBlockComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.goToPage = this.goToPage.bind(this);
    }

    goToPage(url) {
        browserHistory.push(url);
        this.props.UpdatePage(url);
    }

    render() {
        var template = eval("var f = function(){ return " + this.props.Block.compiledtemplate + ";}; f() ;");

        return template(this);
    }
}