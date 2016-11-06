import React from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

import ObjectUtils from '../../../Utils/ObjectUtils.jsx';

import BasePage from '../BasePage.jsx';

import UserService from '../../../Services/UserService.jsx';

import UserList from './UserList.jsx';
import UserEditor from './UserEditor.jsx';
import UserCreator from './UserCreator.jsx';

export default class UsersPage extends BasePage {
    constructor(props) {
        super(props);

        this.state = {
            EditingUser: null,
            CreatingUser: null,
            Users: []
        };

        this.setEditingUser = this.setEditingUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.addNewUser = this.addNewUser.bind(this);
        this.closeUserCreator = this.closeUserCreator.bind(this);
        this.updateCreatingName = this.updateCreatingName.bind(this);
        this.updateCreatingPassword = this.updateCreatingPassword.bind(this);
        this.createUser = this.createUser.bind(this);
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
        this.setState({ CreatingUser: { name: '', password: '' }});
    }

    updateCreatingName(value) {
        var newUser = ObjectUtils.Clone(this.state.CreatingUser);
        newUser.name = value;

        this.setState({ CreatingUser: newUser });
    }

    updateCreatingPassword(value) {
        var newUser = ObjectUtils.Clone(this.state.CreatingUser);
        newUser.password = value;

        this.setState({ CreatingUser: newUser });
    }

    createUser() {
        var self = this;

        UserService.AddUser(
            this.state.CreatingUser.name,
            this.state.CreatingUser.password
        ).then((addRes) => {
            UserService.GetUsers().then((res) => {
                self.setState({ Users: res.data.data }); 
            });
        });
    }

    closeUserCreator() {
        this.setState({ CreatingUser: null });
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
        var creatingUser = <div />;
        if(this.state.CreatingUser != null){
            creatingUser = <UserCreator
                User={this.state.CreatingUser}
                CreateUser={this.createUser}
                CloseUserCreator={this.closeUserCreator}
                UpdateName={this.updateCreatingName}
                UpdatePassword={this.updateCreatingPassword}
            />;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                        <UserList Users={this.state.Users} SetEditingUser={this.setEditingUser} />
                    </Col>

                    {editingUser}
                    {creatingUser}
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