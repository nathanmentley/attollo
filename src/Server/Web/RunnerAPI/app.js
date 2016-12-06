//Setup common code.
import Attollo from "../../Common/Attollo";

import ConfigUtils from '../../Common/Utils/ConfigUtils';
import LogUtils from '../../Common/Utils/LogUtils';

import ControllerContext from './ControllerContext';

import BlockContainerController from "./Controllers/BlockContainerController";
import BlockController from "./Controllers/BlockController";
import DataTypeController from "./Controllers/DataTypeController";
import PageController from "./Controllers/PageController";

Attollo.Start('RunnerAPI')
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
	BlockContainerController.Setup(ControllerContext);
	BlockController.Setup(ControllerContext);
	DataTypeController.Setup(ControllerContext);
	PageController.Setup(ControllerContext);

	LogUtils.Info("Port: " + ControllerContext.App.get('port'));

	//begin server
	var server = ControllerContext.App.listen(ControllerContext.App.get('port'), () => {
		LogUtils.Info('Node app is running on port ' + ControllerContext.App.get('port'));
	});

	//do something when app is closing
	process.on('exit', (options, err) => { Attollo.Stop(); LogUtils.Info("exit: " + JSON.stringify(err)); server.close(); });
	//catches ctrl+c event
	process.on('SIGINT', (options, err) => { Attollo.Stop(); LogUtils.Info("SIGINT: " + JSON.stringify(err)); server.close(); });
	//catches uncaught exceptions
	process.on('uncaughtException', (options, err) => { Attollo.Stop(); LogUtils.Info("uncaughtException: " + JSON.stringify(err)); server.close(); });
});