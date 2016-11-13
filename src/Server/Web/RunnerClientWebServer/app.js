//Setup common code.
require("../../Common/Attollo");

(function() {
	Attollo.App.Start('RunnerClientWebServer', function () {
		//Attollo.Services.MessageQueue.Start();
	});

    var webroot = process.argv[2];
    var port = process.argv[3];

    var express = require('express');
    var path = require('path');
	var less = require("less");
	var fs = require('fs');

	var auth = require("./AuthConfig");

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

	//Render Dynamic Css
	app.get("/app.css", auth(null), function(req, res) {
		Attollo.Services.Css.GetSiteLess(req.AuthContext, req.AuthContext.SiteID)
		.then((siteLess) => {
			Attollo.Utils.Log.Info(siteLess);
			Attollo.Utils.Log.Info(__dirname + '/less/app.less');

			fs.readFile(__dirname + '/less/app.less', "utf8", function(err, data) {
				if (err) {
					throw err;
				}

				data = data.replace("{template}", siteLess);

				less.render(data, function(lessErr, result) {
					if (lessErr) {
						throw lessErr;
					}
					res.header("Content-type", "text/css");
					res.send(result.css);
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: true,
				data: {
					message: err.message
				}
			});
		});
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