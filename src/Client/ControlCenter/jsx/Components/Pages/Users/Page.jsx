import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import UserService from '../../../Services/UserService.jsx';

import UserList from './UserList.jsx';
import UserEditor from './UserEditor.jsx';

export default class UsersPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingUser: null,
            Users: []
        };

        this.setEditingUser = this.setEditingUser.bind(this);

        this.addNewUser = this.addNewUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    
    componentDidMount() {
        var self = this;

        self.setPageTitle("Users", () => {
            UserService.GetUsers().then((res) => {
                self.setState({ Users: res.data.data }, () => {
                    self.setBreadCrumbs([
                        {
                            title: "Dashboard",
                            url: "/"
                        }
                    ]);
                }); 
            });
        });
    }

    setEditingUser(user) {
        if(user) {
            this.setState({ EditingUser: ObjectUtils.Clone(user) });
        } else {
            this.setState({ EditingUser: null });
        }
    }

    saveUser() {
        var self = this;

        UserService.SaveUser(this.state.EditingUser).then((saveResult) => {
            UserService.GetUsers().then((getResult) => {
                self.setState({ Users: getResult.data.data, EditingUser: null }, () => {
                }); 
            });
        });
    }

    deleteUser() {
        var self = this;

        UserService.DeleteUser(this.state.EditingUser.id).then((saveResult) => {
            UserService.GetUsers().then((getResult) => {
                self.setState({ Users: getResult.data.data, EditingUser: null }); 
            });
        });
    }

    addNewUser() {
        var self = this;

        UserService.AddUser().then((addRes) => {
            UserService.GetUsers().then((res) => {
                self.setState({ Users: res.data.data }); 
            });
        });
    }

    _render() {
        var editingUser = <div />;
        if(this.state.EditingUser != null){
            editingUser = <UserEditor
                User={this.state.EditingUser}
                SaveUser={this.saveUser}
                DeleteUser={this.deleteUser}
                SetEditingUser={this.setEditingUser}
            />;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <UserList Users={this.state.Users} SetEditingUser={this.setEditingUser} />
                    </Col>

                    {editingUser}
                </Row>

                <Row>
                    <Col xs={12} md={12} className="page-action-bar">
                        <div className="btn btn-primary pull-right" onClick={this.addNewUser}>
                            <Glyphicon glyph="plus" /> Add New User
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}