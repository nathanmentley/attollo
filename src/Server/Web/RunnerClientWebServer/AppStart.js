import { Dependencies } from 'constitute';
import express from 'express';
import mime from 'mime-types';
import less from "less";
import CleanCSS from 'clean-css';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import greenlockExpress from 'greenlock-express';

import LogUtils from '../../Common/Utils/LogUtils';
import ConfigUtils from '../../Common/Utils/ConfigUtils';

import Template from "./Template.js";
import TemplateProcessor from "./TemplateProcessor.js";
import ClientApp from "../../../Client/Runner/jsx/Components/App.jsx";

import Attollo from "../../Common/Attollo";

import AuthConfig from "./AuthConfig";
import DataTypeResolver from "./DataTypeResolver.js";


var cleanCSS = new CleanCSS();

@Dependencies(
    Attollo,

    AuthConfig,
    DataTypeResolver
)
export default class AppStart {
    constructor(
        attollo,

        authConfig,
        dataTypeResolver
    ) {
        this._attollo = attollo;
        this._authConfig = authConfig;
        this._dataTypeResolver = dataTypeResolver;
    }

    Start() {
        var self = this;

        this._attollo.Start('RunnerClientWebServer')
            .then(() => {
                var webroot = process.argv[2];
                var app = express();
                var lex = greenlockExpress.create(
                    {
                        server: 'staging',
                        approveDomains: (opts, certs, cb) => {
                            // This is where you check your database and associated
                            // email addresses with domains and agreements and such


                            // The domains being approved for the first time are listed in opts.domains
                            // Certs being renewed are listed in certs.altnames
                            if (certs) {
                                opts.domains = certs.altnames;
                            }
                            else {
                                opts.email = 'john.doe@example.com';
                                opts.agreeTos = true;
                            }

                            // NOTE: you can also change other options such as `challengeType` and `challenge`
                            // opts.challengeType = 'http-01';
                            // opts.challenge = require('le-challenge-fs').create({});

                            cb(null, { options: opts, certs: certs });
                        }
                    }
                );

                // handles acme-challenge and redirects to https
                require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
                    console.log("Listening for ACME http-01 challenges on", this.address());
                });
                // handles your app
                require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
                    console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
                });
                /*
                app.set('port', port || ConfigUtils.Config.PortNumber);
                //Force HTTPS on non local
                if (ConfigUtils.Config.Environment != "Local") {
                    app.use(function (request, response, next) {
                        if (request.headers['x-forwarded-proto'] != 'https') {
                            response.redirect('https://' + request.headers.host + request.path);
                        } else {
                            return next();
                        }
                    });
                }
                */

                app.use(express.static(webroot));

                /*
                // Listen for requests
                var server = app.listen(app.get('port'), function () {
                });
                */

                //Render Dynamic Css
                app.get("/app.css", self._authConfig.BuildContext(), function (req, res) {
                    self._attollo.Services.Css.GetSiteVersionLess(req.AuthContext, req.AuthContext.SiteVersionID)
                        .then((siteLess) => {
                            fs.readFile(process.cwd() + '/less/app.less', "utf8", (err, data) => {
                                if (err) {
                                    throw err;
                                }
                                data = data.replace("{template}", siteLess);
                                less.render(data, (lessErr, result) => {
                                    if (lessErr) {
                                        throw lessErr;
                                    }

                                    cleanCSS.minify(result.css, (errors, minified) => {
                                        res.header("Content-type", "text/css");
                                        res.send(minified.styles);
                                    });
                                });
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                error: true,
                                data: {
                                    message: err.message
                                }
                            });
                        });
                });

                //Setup Asset Route
                app.get('/Assets', self._authConfig.BuildContext(), (req, res) => {
                    var filename = req.query.filename;
                    var filestream = self._attollo.Services.CloudStorage.Get(req.AuthContext, filename);

                    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                    res.setHeader('Content-type', mime.lookup(filename));

                    filestream.pipe(res);
                });

                app.get('*', self._authConfig.BuildContext(), (req, res) => {
                    try {
                        self._attollo.Services.Page.GetPages(req.AuthContext, req.AuthContext.SiteVersionID)
                            .then((pages) => {
                                pages = pages.toJSON();
                                var page = pages.find((x) => {
                                    return x.url == req.originalUrl;
                                });
                                if (page == null) {
                                    page = pages[0];
                                }

                                self._attollo.Services.Block.GetBlockContainers(req.AuthContext, page.id)
                                    .then((blockContainers) => {
                                        blockContainers = blockContainers.toJSON();
                                        var dataTypeResolver = self._dataTypeResolver.Create(req.AuthContext);

                                        var promises = [];
                                        blockContainers.forEach((blockContainer) => {
                                            blockContainer.BlockContainerAreas.forEach((blockContainerArea) => {
                                                blockContainerArea.BlockContainerAreaInstances.forEach((blockContainerAreaInstances) => {
                                                    blockContainerAreaInstances.Block.BlockDef.BlockDefDataRequests.forEach((blockDefDataRequest) => {
                                                        promises.push(
                                                            dataTypeResolver.Resolve(
                                                                block.id,
                                                                blockDefDataRequest.resultname,
                                                                blockDefDataRequest.datatypedefid,
                                                                blockDefDataRequest.filtername
                                                            )
                                                        );
                                                    });
                                                });
                                            });
                                        });

                                        Promise.all(promises)
                                            .then(() => {
                                                var appString = renderToString(<ClientApp
                                                        Pages={pages}
                                                        BlockContainers={blockContainers}
                                                        Page={page}
                                                        TemplateProcessor={TemplateProcessor}
                                                        DataTypes={dataTypeResolver.GetResolvedData()}
                                                    />
                                                );

                                                res.status(200).send(Template({
                                                    body: appString,
                                                    title: page.title,
                                                    initialState: {
                                                        Pages: pages,
                                                        Page: page,
                                                        BlockContainers: blockContainers,
                                                        BlockDataTypes: dataTypeResolver.GetResolvedData()
                                                    }
                                                }));
                                            })
                                            .catch((err) => {
                                                res.status(500).json({
                                                    error: true,
                                                    data: {
                                                        message: err.message,
                                                        stack: err.stack
                                                    }
                                                });
                                            });
                                    })
                                    .catch((err) => {
                                        res.status(500).json({
                                            error: true,
                                            data: {
                                                message: err.message,
                                                stack: err.stack
                                            }
                                        });
                                    });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: true,
                                    data: {
                                        message: err.message,
                                        stack: err.stack
                                    }
                                });
                            });
                    } catch (err) {
                        LogUtils.Info(JSON.stringify(err));
                    }
                });

                //do something when app is closing
                process.on('exit', function (options, err) {
                    LogUtils.Info("exit: " + JSON.stringify(err));
                    self._attollo.Stop();
                    server.close();
                });
                //catches ctrl+c event
                process.on('SIGINT', function (options, err) {
                    LogUtils.Info("SIGINT: " + JSON.stringify(err));
                    self._attollo.Stop();
                    server.close();
                });
                //catches uncaught exceptions
                process.on('uncaughtException', function (options, err) {
                    LogUtils.Info("uncaughtException: " + JSON.stringify(err));
                    self._attollo.Stop();
                    server.close();
                });
            });
    }
}