import { Dependencies } from 'constitute';

import express from 'express';

import Attollo from "../../Common/Attollo";
import ConfigUtils from '../../Common/Utils/ConfigUtils';

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
                var port = process.argv[3];
                var app = express();

                app.set('port', port || ConfigUtils.Config.PortNumber);

                //Force HTTPS on non local
                if (ConfigUtils.Config.Environment != "Local" &&
                    ConfigUtils.Config.Environment != "NativeLocal" &&
                    ConfigUtils.Config.Environment != "Demo"
                ) {
                    app.use((request, response, next) => {
                        if (request.headers['x-forwarded-proto'] != 'https') {
                            response.redirect('https://' + request.headers.host + request.path);
                        } else {
                            return next();
                        }
                    });
                }
                app.use(express.static(webroot));

                // Listen for requests
                var server = app.listen(app.get('port'), () => {
                });

                app.get('*', (req, res) => {
                    res.sendFile(webroot + '/index.html');
                });

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