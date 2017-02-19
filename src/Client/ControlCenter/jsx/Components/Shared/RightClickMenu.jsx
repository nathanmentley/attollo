import React from 'react';

import EventUtils from '../../Utils/EventUtils.jsx';

import BaseComponent from '../BaseComponent.jsx';

export default class RightClickMenu extends BaseComponent {
    constructor(props) {
        super(props);

        this.openMenu = this.openMenu.bind(this);
    }

    render() {
        return (
            <div onContextMenu={this.openMenu}>
                { this.props.children }
            </div>
        );
    }

    openMenu(event) {
        EventUtils.Queue('ContextMenu:Open', { items: this.props.Items, x: event.clientX, y: event.clientY });
    }
}