import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import BaseComponent from '../BaseComponent.jsx';

import SiteService from '../../Services/SiteService.jsx';

export default class Header extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Sites: []
        };

        this.changePage = this.changePage.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        var self = this;

        if(nextProps.IsAuthenticated) {
            SiteService.GetSites().then((res) => {
                self.setState({ Sites: res.data.data });
            });
        }else{
            self.setState({ Sites: [] });
        }
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
                            <a onClick={function() { self.changePage('/Dashboard')} }>
                                Attollo
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={function() { self.changePage('/Users')} }>
                                <Glyphicon glyph="user" /> Users
                            </NavItem>
                            <NavDropdown eventKey={2} title={<span><Glyphicon glyph="globe" /> Sites</span>} id="basic-nav-dropdown">
                                <MenuItem eventKey={2.1} onClick={function() { self.changePage('/Sites')} }>Show All</MenuItem>
                                
                                <MenuItem divider />
                                
                                {self.state.Sites.map((site) => {
                                    var eventKey = 2;
                                    eventKey += (0.1 * (2 + self.state.Sites.indexOf(site)));

                                    return (
                                        <MenuItem
                                            key={site.id}
                                            eventKey={eventKey}
                                            onClick={function() { self.changePage('/Sites/' + site.id )} }
                                        >
                                            {site.name}
                                        </MenuItem>
                                    );
                                })}
                                
                            </NavDropdown>
                            <NavItem eventKey={3} onClick={function() { self.changePage('/Reports')} }>
                                <Glyphicon glyph="signal" /> Reports
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={function() { self.changePage('/Account')} }>
                                <Glyphicon glyph="cog" /> Account
                            </NavItem>
                            <NavItem eventKey={2} onClick={function() { self.changePage('/Login')} }>
                                <Glyphicon glyph="log-out" /> Logout
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else {
            return (
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={function() { self.changePage('/Dashboard')} }>
                                Attollo
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                </Navbar>
            );
        }
    }
}