import React from 'react';
import { OverlayTrigger, Popover, Glyphicon } from 'react-bootstrap';

import BaseComponent from '../BaseComponent.jsx';


export default class RightClickMenu extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                display: 'none'
            }
        };

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    render() {
        return (
            <div className="attollo-right-click-menu-wrapper" onContextMenu={this.openMenu} onClick={this.closeMenu}>
                <div className="attollo-right-click-menu" style={this.state.style}>
                    {this.props.Items.map((item) => {
                        var clickHandler = () => {
                            this.closeMenu();
                            item.logic();
                        }

                        return (
                            <p onClick={clickHandler} key={this.props.Items.indexOf(item)}>{item.content}</p>
                        );
                    })}
                </div>

                { this.props.children }
            </div>
        );
    }

    openMenu(event) {
        this.setState({
            style: {
                left: (event.clientX - document.body.scrollLeft) + 'px',
                top: (event.clientY - document.body.scrollTop) + 'px',
                display: 'block',
                position: 'absolute'
            }
        });
    }

    closeMenu() {
        this.setState({ style: { display: 'none' } });
    }
}