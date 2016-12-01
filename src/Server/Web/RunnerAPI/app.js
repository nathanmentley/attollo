//Setup common code.
require("../../Common/Attollo");

(function () {
	Attollo.App.Start('RunnerAPI', () => {
		//load deps
		var controllerContext = require('./ControllerContext');
		var fs = require('fs');
		
		//enabled cors
		controllerContext.App.all('*', (req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			next();
		});

		controllerContext.App.set('port', Attollo.Utils.Config.PortNumber);
		
		//Setup Json Body Parser
		controllerContext.App.use(require('body-parser').json());
		
		//Force HTTPS on non local
		if (Attollo.Utils.Config.Environment != "Local" &&
				Attollo.Utils.Config.Environment != "NativeLocal" &&
				Attollo.Utils.Config.Environment != "Demo"
		) {
			controllerContext.App.use((request, response, next) => {
					if (request.headers['x-forwarded-proto'] != 'https') {
							response.redirect('https://' + request.headers.host + request.path);
					} else {
							return next();
					}
			});
		}
		
		//Setup each controller.
		fs.readdir(__dirname + '/Controllers', (err, items) => {
			for (var i = 0; i < items.length; i++) {
				if(items[i].endsWith('Controller.js')) {
					var controller = require("./Controllers/" + items[i]);
					controller.Setup(controllerContext);
				}
			}
		});

		//begin server
		var server = controllerContext.App.listen(controllerContext.App.get('port'), () => {
			Attollo.Utils.Log.Info('Node app is running on port ' + controllerContext.App.get('port'));
		});

		//do something when app is closing
		process.on('exit', (options, err) => { Attollo.App.Stop(); server.close(); });
		//catches ctrl+c event
		process.on('SIGINT', (options, err) => { Attollo.App.Stop(); server.close(); });
		//catches uncaught exceptions
		process.on('uncaughtException', (options, err) => { Attollo.App.Stop(); server.close(); });
	});
})();