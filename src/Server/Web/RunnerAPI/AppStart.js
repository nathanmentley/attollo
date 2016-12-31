import { Dependencies } from 'constitute';

import ConfigUtils from '../../Common/Utils/ConfigUtils';
import LogUtils from '../../Common/Utils/LogUtils';

import Attollo from "../../Common/Attollo";

import ControllerContext from './ControllerContext';

import BlockContainerController from "./Controllers/BlockContainerController";
import BlockController from "./Controllers/BlockController";
import DataTypeController from "./Controllers/DataTypeController";
import PageController from "./Controllers/PageController";

@Dependencies(
    Attollo,

    ControllerContext,

    BlockContainerController,
    BlockController,
    DataTypeController,
    PageController
)
export default class AppStart {
    constructor(
        attollo,

        controllerContext,

        blockContainerController,
        blockController,
        dataTypeController,
        pageController
    ) {
        this._attollo = attollo;
        this._controllerContext = controllerContext;

        this._controllers = [
            blockContainerController,
            blockController,
            dataTypeController,
            pageController
        ];
    }

    Start() {
        this._attollo.Start('RunnerAPI')
            .then(() => {
                //enabled cors
                this._controllerContext.App.all('*', (req, res, next) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
                    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                    next();
                });

                this._controllerContext.App.set('port', ConfigUtils.Config.PortNumber);

                //Setup Json Body Parser
                this._controllerContext.App.use(require('body-parser').json());

                //Force HTTPS on non local
                if (ConfigUtils.Config.Environment != "Local" &&
                    ConfigUtils.Config.Environment != "NativeLocal" &&
                    ConfigUtils.Config.Environment != "Demo"
                ) {
                    this._controllerContext.App.use((request, response, next) => {
                        if (request.headers['x-forwarded-proto'] != 'https') {
                            response.redirect('https://' + request.headers.host + request.path);
                        } else {
                            return next();
                        }
                    });
                }

                //Setup each controller.
                this._controllers.forEach((controller) => {
                    controller.Setup(this._controllerContext);
                });

                LogUtils.Info("Port: " + this._controllerContext.App.get('port'));

                //begin server
                var server = this._controllerContext.App.listen(this._controllerContext.App.get('port'), () => {
                    LogUtils.Info('Node app is running on port ' + this._controllerContext.App.get('port'));
                });

                //do something when app is closing
                process.on('exit', (options, err) => { this._attollo.Stop(); LogUtils.Info("exit: " + JSON.stringify(err)); server.close(); });
                //catches ctrl+c event
                process.on('SIGINT', (options, err) => { this._attollo.Stop(); LogUtils.Info("SIGINT: " + JSON.stringify(err)); server.close(); });
                //catches uncaught exceptions
                process.on('uncaughtException', (options, err) => { this._attollo.Stop(); LogUtils.Info("uncaughtException: " + JSON.stringify(err)); server.close(); });
            });
    }
}