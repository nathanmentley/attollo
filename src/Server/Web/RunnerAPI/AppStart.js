import { Dependencies } from 'constitute';

import ConfigUtils from '../../Common/Utils/ConfigUtils';
import LogUtils from '../../Common/Utils/LogUtils';
import WebUtils from '../../Common/Utils/WebUtils';

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
                WebUtils.EnableCors(this._controllerContext.App);

                //Setup Json Body Parser
                this._controllerContext.App.use(require('body-parser').json());

                //Setup each controller.
                this._controllers.forEach((controller) => {
                    controller.Setup(this._controllerContext);
                });

                var server = WebUtils.StartWebApp(this._controllerContext.App, ConfigUtils.Config.PortNumber, ConfigUtils.Config.SecurePortNumber);

                //do something when app is closing
                process.on('exit', (options, err) => { this._attollo.Stop(); LogUtils.Info("exit: " + JSON.stringify(err)); server.close(); });
                //catches ctrl+c event
                process.on('SIGINT', (options, err) => { this._attollo.Stop(); LogUtils.Info("SIGINT: " + JSON.stringify(err)); server.close(); });
                //catches uncaught exceptions
                process.on('uncaughtException', (options, err) => { this._attollo.Stop(); LogUtils.Info("uncaughtException: " + JSON.stringify(err)); server.close(); });
            });
    }
}