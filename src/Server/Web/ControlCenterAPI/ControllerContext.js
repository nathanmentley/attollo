(function () {
	var express = require('express');
	var app = express();
	var auth = require("./AuthConfig");

	var classDef = function () {};
    
    classDef.prototype.App = app;
    classDef.prototype.Auth = auth;
    classDef.prototype.Express = express;
    classDef.prototype.ResponseProcessor = (request, response, logicPromise) => {
		response.setHeader('Content-Type', 'application/json');
		
         logicPromise
            .then((result) => {
                response.json({
                    error: false,
                    data: result != null ? ((typeof result.toJSON === 'function') ? result.toJSON() : result) : null
                });
            })
            .catch((err) => {
                response.status(500).json({
                    error: true,
                    data: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
    };

	module.exports = new classDef();
})();
