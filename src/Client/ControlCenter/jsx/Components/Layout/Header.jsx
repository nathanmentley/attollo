import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import BaseComponent from '../BaseComponent.jsx';

export default class Header extends BaseComponent {
    constructor(props) {
        super(props);

        this.changePage = this.changePage.bind(this);
    }

    changePage(url) {
        browserHistory.push(url);
    }

    render() {
        var self = this;

        if (this.props.IsAuthenticated) {
            return (
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={function() { self.changePage('/Dashboard')} }>Attollo</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={function() { self.changePage('/Dashboard')} }>Main</NavItem>
                            <NavDropdown eventKey={2} title="Sites" id="basic-nav-dropdown">
                                <MenuItem eventKey={2.1} onClick={function() { self.changePage('/Sites')} }>Show All</MenuItem>
                                
                                <MenuItem divider />

                                <MenuItem eventKey={2.2}>Dynamic</MenuItem>
                                <MenuItem eventKey={2.3}>List Of User</MenuItem>
                                <MenuItem eventKey={2.3}>Sites</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={3} onClick={function() { self.changePage('/About')} }>About</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={function() { self.changePage('/Account')} }>Account</NavItem>
                            <NavItem eventKey={2} onClick={function() { self.changePage('/Login')} }>Logout</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else {
            return (<div />);
        }
    }
}