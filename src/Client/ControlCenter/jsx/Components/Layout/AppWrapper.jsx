import React from 'react';

import EventUtils from '../../Utils/EventUtils.jsx';

import BaseComponent from '../BaseComponent.jsx';

import ContextMenu from './ContextMenu.jsx';

export default class AppWrapper extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: null,
            menuX: 0,
            menuY: 0
        }
    }

    componentDidMount() {
        EventUtils.Listen('ContextMenu:Open', (args) => {
            this.setState({ menuItems: args.items, menuX: args.x, menuY: args.y })
        });
        EventUtils.Listen('ContextMenu:Close', () => {
            this.setState({ menuItems: null })
        });
    }

    render() {
        return (
            <div>
                { this.state.menuItems ? <ContextMenu Items={this.state.menuItems} X={this.state.menuX} Y={this.state.menuY} /> : "" }
                {this.props.children}
            </div>
        );
    }
}