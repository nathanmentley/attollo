import constitute from 'constitute';
import jwt from 'jwt-simple';

import Attollo from '../../../Common/Attollo';

import ConfigUtils from '../../../Common/Utils/ConfigUtils';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class AuthController extends BaseController {
    static get UrlEndpoint() { return '/Auth'; }
    static get HasAuth() { return false; }

    static PostLogic(request, response) {
        return new Promise((resolve, reject) => {
            attollo.Services.User.GetUser({}, request.body.username, request.body.password)
                .then((users) => {
                    var user = users.first();

                    if(user) {
                        var permissions = [];

                        var rolePermissions = user.relations['Role'].relations['RolePermisions'].toJSON();
                        for(var i = 0; i < rolePermissions.length; i++) {
                            permissions.push(rolePermissions[i].PermissionDef.code);
                        }

                        var userPermissions = user.relations['UserPermissions'].toJSON();
                        for(var i = 0; i < userPermissions.length; i++) {
                            var hasPermission = userPermissions[i].haspermission;
                            var code = userPermissions[i].PermissionDef.code;

                            if(hasPermission != "0") {
                                permissions.push(code);
                            } else {
                                for(var j = 0; j < permissions.length; j++) {
                                    if(permissions[j] == code) {
                                        permissions.splice(j, 1);
                                    }
                                }
                            }
                        }

                        var tokenData = {
                            clientid: user.get('clientid'),
                            name: user.get('name'),
                            permissions: permissions,
                            env: ConfigUtils.Config.Environment
                        };

                        resolve({
                            token: jwt.encode(tokenData, ConfigUtils.Config.JwtSecret),
                            permissions: permissions
                        });
                    }else{
                        reject(new Error('Invalid username or password.'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};