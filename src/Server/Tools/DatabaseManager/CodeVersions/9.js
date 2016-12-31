//Seed PageDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import PermissionDefCodes from '../../../../Platform/Constants/PermissionDefCodes';

var attollo = constitute(Attollo);

(function () {

    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.User.AddPermissionDef(dbContext, 'Login', 'Login', 'Can Log In.'),
            attollo.Services.User.AddPermissionDef(dbContext, 'Login2', 'Login2', 'Can Log In 2.'),
            attollo.Services.User.AddPermissionDef(dbContext, 'View Users', PermissionDefCodes.ViewUsers, 'User Can View Users.')
        ])
        .then(() => {
            Promise.all([
                attollo.Services.User.AddRole(dbContext, 'Admin', 'Admin'),
                attollo.Services.User.AddRole(dbContext, 'UserAdmin', 'UserAdmin')
            ])
            .then(() => {
                Promise.all([
                    attollo.Services.User.AddRolePermission(dbContext, 'Login', 'Admin'),
                    attollo.Services.User.AddRolePermission(dbContext, 'Login2', 'Admin'),
                    attollo.Services.User.AddRolePermission(dbContext, PermissionDefCodes.ViewUsers, 'Admin'),
                    attollo.Services.User.AddRolePermission(dbContext, PermissionDefCodes.ViewUsers, 'UserAdmin')
                ])
                .then(() => {
                    callback();
                })
                .catch((err) => {
                    errorCallback(err);
                });
            })
            .catch((err) => {
                errorCallback(err);
            });
        })
        .catch((err) => {
            errorCallback(err);
        });
    };

    module.exports = new classDef();
})();