import { Dependencies } from 'constitute';

import Attollo from "../../Common/Attollo";

@Dependencies(
    Attollo
)
export default class AuthConfig {
    constructor(attollo) {
        this._attollo = attollo;
    }

    BuildContext() {
        var self = this;

        return function (req, res, next) {
            var originDomain = req.get('host').replace("http://", "");

            self._attollo.Services.Site.GetSite({}, originDomain)
                .then(function (sites) {
                    var site = sites.first();

                    self._attollo.Services.Site.GetCurrentSiteVersion({}, site)
                        .then(function (siteVersions) {
                            var siteVersion = siteVersions.first();

                            if (site && siteVersion) {
                                req.AuthContext = {
                                    ClientID: site.get('clientid'),
                                    UserName: '*SYSTEM|RunnerClientWebServer',
                                    SiteID: site.get('id'),
                                    SiteVersionID: siteVersion.get('id')
                                };
                                next();
                            } else {
                                res.statusCode = 403;
                                res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                                res.end('Forbidden1');
                            }
                        })
                        .catch(function (err) {
                            res.statusCode = 403;
                            res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                            res.end('Forbidden2');
                        });
                })
                .catch(function (err) {
                    res.statusCode = 403;
                    res.setHeader('WWW-Authenticate', 'Basic realm="Attollo"');
                    res.end(JSON.stringify(err));
                });
        };
    }
};