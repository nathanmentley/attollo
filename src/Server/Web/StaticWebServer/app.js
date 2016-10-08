//Setup common code.
require("../../Common/Attollo");

(function() {
    var webroot = process.argv[2];

    var express = require('express');
    var path = require('path');


    var app = express();
    app.set('port', Attollo.Utils.Config.PortNumber);
    app.use(express.static(webroot));
    
    // Listen for requests
    var server = app.listen(app.get('port'), function() {
    });

    app.get('*', function(req, res){
        res.sendFile(webroot + '/index.html');
    });
})();