import { Dependencies } from 'constitute';

import ConfigUtils from '../../Common/Utils/ConfigUtils';
import LogUtils from '../../Common/Utils/LogUtils';
import WebUtils from '../../Common/Utils/WebUtils';

import Attollo from "../../Common/Attollo";

import ControllerContext from './ControllerContext';

import AssetController from "./Controllers/AssetController";
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
import PluginDefLogicController from "./Controllers/PluginDefLogicController";
import PluginDefLogicDefController from "./Controllers/PluginDefLogicDefController";
import PluginDefLogicTargetController from "./Controllers/PluginDefLogicTargetController";
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

    AssetController,
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
	PluginDefLogicController,
	PluginDefLogicDefController,
	PluginDefLogicTargetController,
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

        assetController,
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
        pluginDefLogicController,
        pluginDefLogicDefController,
        pluginDefLogicTargetController,
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
            assetController,
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
	        pluginDefLogicController,
	        pluginDefLogicDefController,
	        pluginDefLogicTargetController,
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
                //enabled cors
                WebUtils.EnableCors(this._controllerContext.App);

                //Setup Json Body Parser
                this._controllerContext.App.use(require('body-parser').json({limit: '50mb'}));

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
