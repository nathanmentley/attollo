import { Dependencies } from 'constitute';
import jwt from 'jwt-simple';

import Attollo from "../../Common/Attollo";

import ConfigUtils from '../../Common/Utils/ConfigUtils';
import Auid from '../../Common/DAL/Core/Auid';


@Dependencies(
    Attollo
)
export default class AuthConfig {
    constructor(attollo) {
        this._attollo = attollo;
    }

    BuildContext(permission) {
        var self = this;

        return function (req, res, next) {
            if (req.headers.authorization) {
                var decoded = jwt.decode(req.headers.authorization.substring(7), ConfigUtils.Config.JwtSecret);

                if (decoded) {
                    req.AuthContext = {
                        ClientID: decoded.clientid,
                        UserName: decoded.clientid + '|' + decoded.name,
                        PluginDefIds: []
                    };

                    self._attollo.Services.Plugin.GetPlugins(req.AuthContext)
                        .then((plugins) => {
                            plugins.forEach((x) => {
                                req.AuthContext.PluginDefIds.push(
                                    Auid.Decode(
                                        x.relations['PluginDef'].get('id')
                                    )
                                );
                            });

                            if (permission) {
                                var authorized = false;

                                for (var i = 0; i < decoded.permissions.length; i++) {
                                    if (decoded.permissions[i] == permission) {
                                        authorized = true;
                                    }
                                }

                                if (authorized) {
                                    next();
                                } else {
                                    res.statusCode = 403;
                                    res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                                    res.end('Forbidden');
                                }
                            } else {
                                next();
                            }
                        })
                        .catch(() => {
                            res.statusCode = 403;
                            res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                            res.end('Forbidden');
                        });
                } else {
                    res.statusCode = 403;
                    res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                    res.end('Forbidden');
                }
            } else {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                res.end('Unauthorized');
            }
        };
    }
};