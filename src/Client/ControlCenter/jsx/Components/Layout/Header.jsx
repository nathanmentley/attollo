import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import PermissionDefCodes from '../../../../../Platform/Constants/PermissionDefCodes.js';

import BaseComponent from '../BaseComponent.jsx';

import AjaxService from '../../Services/AjaxService.jsx';
import SiteService from '../../Services/SiteService.jsx';
import DataTypeDefService from '../../Services/DataTypeDefService.jsx';

export default class Header extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            Sites: [],
            DataTypeDefs: []
        };

        this.changePage = this.changePage.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        var self = this;

        if(nextProps.IsAuthenticated) {
            SiteService.GetSites().then((res) => {
                self.setState({ Sites: res.data.data });
            });
            DataTypeDefService.GetDataTypeDefs().then((res) => {
                self.setState({ DataTypeDefs: res.data.data });
            });
        }else{
            self.setState({ Sites: [], DataTypeDefs: [] });
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
                            <a onClick={() => { self.changePage('/Dashboard')} }>
                                Attollo
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem style={{ display: (AjaxService.HasPermission(PermissionDefCodes.ViewUsers) ? 'inherit' : 'none') }} eventKey={1} onClick={() => { self.changePage('/Users')} }>
                                <Glyphicon glyph="user" /> Users
                            </NavItem>
                            <NavDropdown eventKey={2} title={<span><Glyphicon glyph="globe" /> Sites</span>} id="basic-nav-dropdown">
                                <MenuItem eventKey={2.1} onClick={() => { self.changePage('/Sites')} }>Show All</MenuItem>
                                
                                <MenuItem divider />
                                
                                {self.state.Sites.map((site) => {
                                    var eventKey = 2;
                                    eventKey += (0.1 * (2 + self.state.Sites.indexOf(site)));

                                    return (
                                        <MenuItem
                                            key={site.id}
                                            eventKey={eventKey}
                                            onClick={() => { self.changePage('/Sites/' + site.id )} }
                                        >
                                            {site.name}
                                        </MenuItem>
                                    );
                                })}
                                
                            </NavDropdown>
                            <NavItem eventKey={3} onClick={() => { self.changePage('/Plugins')} }>
                                <Glyphicon glyph="link" /> Plugins
                            </NavItem>
                            <NavDropdown eventKey={4} title={<span><Glyphicon glyph="briefcase" /> Data Types</span>} id="basic-nav-dropdown">
                                <MenuItem eventKey={4.1} onClick={() => { self.changePage('/DataTypes')} }>Show All</MenuItem>
                                
                                <MenuItem divider />
                                
                                {self.state.DataTypeDefs.map((dataTypeDef) => {
                                    var eventKey = 4;
                                    eventKey += (0.1 * (2 + self.state.DataTypeDefs.indexOf(dataTypeDef)));

                                    return (
                                        <MenuItem
                                            key={dataTypeDef.id}
                                            eventKey={eventKey}
                                            onClick={() => { self.changePage('/DataTypes/' + dataTypeDef.id )} }
                                        >
                                            {dataTypeDef.name}
                                        </MenuItem>
                                    );
                                })}
                                
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={() => { self.changePage('/Account')} }>
                                <Glyphicon glyph="cog" /> Account
                            </NavItem>
                            <NavItem eventKey={2} onClick={() => { self.changePage('/Login')} }>
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
                            <a onClick={() => { self.changePage('/Dashboard')} }>
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