import { Dependencies } from 'constitute';

import ConfigUtils from '../../Common/Utils/ConfigUtils';
import LogUtils from '../../Common/Utils/LogUtils';

import Attollo from "../../Common/Attollo";

import ControllerContext from './ControllerContext';

import AuthController from "./Controllers/AuthController";
import BlockContainerAreaController from "./Controllers/BlockContainerAreaController";
import BlockContainerAreaInstanceController from "./Controllers/BlockContainerAreaInstanceController";
import BlockContainerController from "./Controllers/BlockContainerController";
import BlockContainerDefController from "./Controllers/BlockContainerDefController";
import BlockController from "./Controllers/BlockController";
import BlockCssRuleController from "./Controllers/BlockCssRuleController";
import BlockDefController from "./Controllers/BlockDefController";
import BlockTemplateDefController from "./Controllers/BlockTemplateDefController";
import CssRuleDefController from "./Controllers/CssRuleDefController";
import DataTypeDefController from "./Controllers/DataTypeDefController";
import DataTypeFieldDefController from "./Controllers/DataTypeFieldDefController";
import DataTypeFieldTypeController from "./Controllers/DataTypeFieldTypeController";
import PageController from "./Controllers/PageController";
import PageDefController from "./Controllers/PageDefController";
import PluginController from "./Controllers/PluginController";
import PluginDefController from "./Controllers/PluginDefController";
import RoleController from "./Controllers/RoleController";
import SiteController from "./Controllers/SiteController";
import SiteVersionController from "./Controllers/SiteVersionController";
import SiteVersionProvisionController from "./Controllers/SiteVersionProvisionController";
import SiteVersionPublishController from "./Controllers/SiteVersionPublishController";
import SiteVersionStatusController from "./Controllers/SiteVersionStatusController";
import ThemeController from "./Controllers/ThemeController";
import UserController from "./Controllers/UserController";

@Dependencies(
    Attollo,

    ControllerContext,

    AuthController,
    BlockContainerAreaController,
    BlockContainerAreaInstanceController,
    BlockContainerController,
    BlockContainerDefController,
    BlockController,
    BlockCssRuleController,
    BlockDefController,
    BlockTemplateDefController,
    CssRuleDefController,
    DataTypeDefController,
    DataTypeFieldDefController,
    DataTypeFieldTypeController,
    PageController,
    PageDefController,
    PluginController,
    PluginDefController,
    RoleController,
    SiteController,
    SiteVersionController,
    SiteVersionProvisionController,
    SiteVersionPublishController,
    SiteVersionStatusController,
    ThemeController,
    UserController
)
export default class AppStart {
    constructor(
        attollo,

        controllerContext,

        authController,
        blockContainerAreaController,
        blockContainerAreaInstanceController,
        blockContainerController,
        blockContainerDefController,
        blockController,
        blockCssRuleController,
        blockDefController,
        blockTemplateDefController,
        cssRuleDefController,
        dataTypeDefController,
        dataTypeFieldDefController,
        dataTypeFieldTypeController,
        pageController,
        pageDefController,
        pluginController,
        pluginDefController,
        roleController,
        siteController,
        siteVersionController,
        siteVersionProvisionController,
        siteVersionPublishController,
        siteVersionStatusController,
        themeController,
        userController
    )
    {
        this._attollo = attollo;
        this._controllerContext = controllerContext;

        this._controllers = [
            authController,
            blockContainerAreaController,
            blockContainerAreaInstanceController,
            blockContainerController,
            blockContainerDefController,
            blockController,
            blockCssRuleController,
            blockDefController,
            blockTemplateDefController,
            cssRuleDefController,
            dataTypeDefController,
            dataTypeFieldDefController,
            dataTypeFieldTypeController,
            pageController,
            pageDefController,
            pluginController,
            pluginDefController,
            roleController,
            siteController,
            siteVersionController,
            siteVersionProvisionController,
            siteVersionPublishController,
            siteVersionStatusController,
            themeController,
            userController
        ];
    }
    
    Start() {
        this._attollo.Start('ControlCenterAPI')
            .then(() => {
                //load deps

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
