import { Dependencies } from 'constitute';

import express from 'express';

import Attollo from "../../Common/Attollo";
import ConfigUtils from '../../Common/Utils/ConfigUtils';
import WebUtils from '../../Common/Utils/WebUtils';

@Dependencies(
    Attollo
)
export default class AppStart {
    constructor(attollo) {
        this._attollo = attollo;
    }

    Start() {
        this._attollo.Start('StaticWebServer')
            .then(() => {
                var webroot = process.argv[2];
                var app = express();

                app.use(express.static(webroot));

                app.get('*', (req, res) => {
                    res.sendFile(webroot + '/index.html');
                });

                var server = WebUtils.StartWebApp(app, ConfigUtils.Config.PortNumber, ConfigUtils.Config.SecurePortNumber);

                //do something when app is closing
                process.on('exit', (options, err) => {
                    this._attollo.Stop();
                    server.close();
                });
                //catches ctrl+c event
                process.on('SIGINT', (options, err) => {
                    this._attollo.Stop();
                    server.close();
                });
                //catches uncaught exceptions
                process.on('uncaughtException', (options, err) => {
                    this._attollo.Stop();
                    server.close();
                });
            });
    }
}