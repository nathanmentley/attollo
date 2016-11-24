//Setup common code.
require("../../Common/Attollo");

(function() {
	Attollo.App.Start('StaticWebServer', function () {
	});

    var webroot = process.argv[2];
    var port = process.argv[3];

    var express = require('express');
    var path = require('path');


    var app = express();

    app.set('port', port || Attollo.Utils.Config.PortNumber);

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

    app.use(express.static(webroot));
    
    // Listen for requests
    var server = app.listen(app.get('port'), function() {
    });

    app.get('*', function(req, res){
        res.sendFile(webroot + '/index.html');
    });

	//do something when app is closing
	process.on('exit', function(options, err) { Attollo.App.Stop(); server.close(); });
	//catches ctrl+c event
	process.on('SIGINT', function(options, err) { Attollo.App.Stop(); server.close(); });
	//catches uncaught exceptions
	process.on('uncaughtException', function(options, err) { Attollo.App.Stop(); server.close(); });
})();