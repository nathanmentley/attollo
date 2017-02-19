import React from 'react';

import EventUtils from '../../Utils/EventUtils.jsx';

import BaseComponent from '../BaseComponent.jsx';

export default class ContextMenu extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                top: this.props.Y + "px",
                left: this.props.X + "px"
            }
        };

        this.closeMenu = this.closeMenu.bind(this);
    }

    closeMenu() {
        EventUtils.Queue('ContextMenu:Close')
    }

    render() {
        return (
            <div className="attollo-right-click-menu-wrapper" onClick={this.closeMenu}>
                <div className="attollo-right-click-menu" style={this.state.style}>
                    {this.props.Items.map((item) => {
                        var clickHandler = () => {
                            item.logic();
                        }

                        return (
                            <p onClick={clickHandler} key={this.props.Items.indexOf(item)}>{item.content}</p>
                        );
                    })}
                </div>
            </div>
        );
    }
}