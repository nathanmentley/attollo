import Attollo from "../../Common/Attollo";
import ConfigUtils from '../../Common/Utils/ConfigUtils';
import ControllerContext from './ControllerContext';

import AuthController from "./Controllers/AuthController";
import BlockContainerAreaController from "./Controllers/BlockContainerAreaController";
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
import SiteVersionStatusController from "./Controllers/SiteVersionStatusController";
import ThemeController from "./Controllers/ThemeController";
import UserController from "./Controllers/UserController";

Attollo.Start('ControlCenterAPI')
.then(() => {
	//load deps
	
	//enabled cors
	ControllerContext.App.all('*', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
	});

	ControllerContext.App.set('port', ConfigUtils.Config.PortNumber);
	
	//Setup Json Body Parser
	ControllerContext.App.use(require('body-parser').json());
	
	//Force HTTPS on non local
	if (ConfigUtils.Config.Environment != "Local" &&
			ConfigUtils.Config.Environment != "NativeLocal" &&
			ConfigUtils.Config.Environment != "Demo"
	) {
		ControllerContext.App.use((request, response, next) => {
				if (request.headers['x-forwarded-proto'] != 'https') {
						response.redirect('https://' + request.headers.host + request.path);
				} else {
						return next();
				}
		});
	}
	
	//Setup each controller.
	AuthController.Setup(ControllerContext);
	BlockContainerAreaController.Setup(ControllerContext);
	BlockContainerController.Setup(ControllerContext);
	BlockContainerDefController.Setup(ControllerContext);
	BlockController.Setup(ControllerContext);
	BlockCssRuleController.Setup(ControllerContext);
	BlockDefController.Setup(ControllerContext);
	BlockTemplateDefController.Setup(ControllerContext);
	CssRuleDefController.Setup(ControllerContext);
	DataTypeDefController.Setup(ControllerContext);
	DataTypeFieldDefController.Setup(ControllerContext);
	DataTypeFieldTypeController.Setup(ControllerContext);
	PageController.Setup(ControllerContext);
	PageDefController.Setup(ControllerContext);
	PluginController.Setup(ControllerContext);
	PluginDefController.Setup(ControllerContext);
	RoleController.Setup(ControllerContext);
	SiteController.Setup(ControllerContext);
	SiteVersionController.Setup(ControllerContext);
	SiteVersionStatusController.Setup(ControllerContext);
	ThemeController.Setup(ControllerContext);
	UserController.Setup(ControllerContext);

	//begin server
	var server = ControllerContext.App.listen(ControllerContext.App.get('port'), () => {
		LogUtils.Info('Node app is running on port ' + ControllerContext.App.get('port'));
	});

	//do something when app is closing
	process.on('exit', (options, err) => { Attollo.Stop(); server.close(); });
	//catches ctrl+c event
	process.on('SIGINT', (options, err) => { Attollo.Stop(); server.close(); });
	//catches uncaught exceptions
	process.on('uncaughtException', (options, err) => { Attollo.Stop(); server.close(); });
});