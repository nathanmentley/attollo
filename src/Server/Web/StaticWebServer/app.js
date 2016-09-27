//Setup common code.
require("../../Common/Attollo");

(function() {
    var static = require('node-static');
    var http = require('http');
    var file = new static.Server(process.argv[2]);
    
    http.createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(Attollo.Utils.Config.PortNumber);
})();