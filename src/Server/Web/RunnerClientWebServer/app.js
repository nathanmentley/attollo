//Setup common code.
import express from 'express';
import less from "less";
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';

import Attollo from "../../Common/Attollo";

import LogUtils from '../../Common/Utils/LogUtils';
import ConfigUtils from '../../Common/Utils/ConfigUtils';
import AuthConfig from "./AuthConfig";

import ClientApp from "../../../Client/Runner/jsx/Components/App.jsx";

import Template from "./Template.js";

Attollo.Start('RunnerClientWebServer')
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
		app.use(function(request, response, next) {
				if (request.headers['x-forwarded-proto'] != 'https') {
						response.redirect('https://' + request.headers.host + request.path);
				} else {
						return next();
				}
		});
	}
	app.use(express.static(webroot));

	// Listen for requests
	var server = app.listen(app.get('port'), function() {
	});

    //Render Dynamic Css
    app.get("/app.css", AuthConfig(), function(req, res) {
        Attollo.Services.Css.GetSiteLess(req.AuthContext, req.AuthContext.SiteID)
            .then((siteLess) => {
                LogUtils.Info(siteLess);
                LogUtils.Info(process.cwd() + '/less/app.less');
                fs.readFile(process.cwd() + '/less/app.less', "utf8", function(err, data) {
                    if (err) {
                        throw err;
                    }
                    data = data.replace("{template}", siteLess);
                    less.render(data, function(lessErr, result) {
                        if (lessErr) {
                            throw lessErr;
                        }
                        res.header("Content-type", "text/css");
                        res.send(result.css);
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

    //Render JS
    app.get("/app.js", AuthConfig(), function(req, res) {

    });

	app.get('*', function(req, res){
		try {
            var appString = renderToString(<ClientApp />);

            res.status(200).send(Template({
                body: appString,
                title: 'title'
            }));
        } catch (err) {
			LogUtils.Info(JSON.stringify(err));
		}
	});

	//do something when app is closing
	process.on('exit', function(options, err) { LogUtils.Info("exit: " + JSON.stringify(err)); Attollo.Stop(); server.close(); });
	//catches ctrl+c event
	process.on('SIGINT', function(options, err) { LogUtils.Info("SIGINT: " + JSON.stringify(err)); Attollo.Stop(); server.close(); });
	//catches uncaught exceptions
	process.on('uncaughtException', function(options, err) { LogUtils.Info("uncaughtException: " + JSON.stringify(err)); Attollo.Stop(); server.close(); });
});