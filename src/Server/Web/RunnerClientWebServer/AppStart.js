import { Dependencies } from 'constitute';
import express from 'express';
import mime from 'mime-types';
import less from "less";
import CleanCSS from 'clean-css';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';

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
                var port = process.argv[3];
                var app = express();

                app.set('port', port || ConfigUtils.Config.PortNumber);
                //Force HTTPS on non local
                if (ConfigUtils.Config.Environment != "Local" &&
                    ConfigUtils.Config.Environment != "NativeLocal" &&
                    ConfigUtils.Config.Environment != "Demo"
                ) {
                    app.use(function (request, response, next) {
                        if (request.headers['x-forwarded-proto'] != 'https') {
                            response.redirect('https://' + request.headers.host + request.path);
                        } else {
                            return next();
                        }
                    });
                }
                app.use(express.static(webroot));

                // Listen for requests
                var server = app.listen(app.get('port'), function () {
                });

                //Render Dynamic Css
                app.get("/app.css", self._authConfig.BuildContext(), function (req, res) {
                    self._attollo.Services.Css.GetSiteLess(req.AuthContext, req.AuthContext.SiteID)
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
                    var filename = "87357.jpg";
                    var filestream = self._attollo.Services.CloudStorage.Get(filename);

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