//Setup common code.
require("../../Common/Attollo");

(function() {
    var webroot = process.argv[2];
    var port = process.argv[3];

    var express = require('express');
    var path = require('path');


    var app = express();
    app.set('port', port || Attollo.Utils.Config.PortNumber);
    app.use(express.static(webroot));
    
    // Listen for requests
    var server = app.listen(app.get('port'), function() {
    });

    app.get('*', function(req, res){
        res.sendFile(webroot + '/index.html');
    });

	//do something when app is closing
	process.on('exit', function(options, err) { Attollo.App.Stop(); });
	//catches ctrl+c event
	process.on('SIGINT', function(options, err) { Attollo.App.Stop(); });
	//catches uncaught exceptions
	process.on('uncaughtException', function(options, err) { Attollo.App.Stop(); });
})();