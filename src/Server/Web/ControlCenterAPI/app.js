React = require('react');

//Setup common code.
require("../../Common/Attollo");

(function () {
	Attollo.App.Start('ControlCenterAPI', function () {
	});

	//load deps
	var express = require('express');
	var app = express();
	var fs = require('fs');
	
	//enabled cors
	app.all('*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
	});

	app.set('port', Attollo.Utils.Config.PortNumber);
	
	//Setup Json Body Parser
	app.use(require('body-parser').json());
	
	//Force HTTPS on non local
	if (Attollo.Utils.Config.Environment != "Local" &&
			Attollo.Utils.Config.Environment != "NativeLocal" &&
			Attollo.Utils.Config.Environment != "Demo"
	) {
		app.use(function(request, response, next) {
				if (request.headers['x-forwarded-proto'] != 'https') {
						response.redirect('https://' + request.headers.host + request.path);
				} else {
						return next();
				}
		});
	}
	
	//Setup each controller.
	fs.readdir(__dirname + '/Controllers', function(err, items) {
		var auth = require("./AuthConfig");
		
	    for (var i = 0; i < items.length; i++) {
			if(items[i].endsWith('Controller.js')) {
				var controller = require("./Controllers/" + items[i]);
				controller.Setup(app, express, auth);
            }
	    }
	});

	//begin server
	var server = app.listen(app.get('port'), function() {
		Attollo.Utils.Log.Info('Node app is running on port ' + app.get('port'));
	});

	//do something when app is closing
	process.on('exit', function(options, err) { Attollo.App.Stop(); server.close(); });
	//catches ctrl+c event
	process.on('SIGINT', function(options, err) { Attollo.App.Stop(); server.close(); });
	//catches uncaught exceptions
	process.on('uncaughtException', function(options, err) { Attollo.App.Stop(); server.close(); });
})();