(function () {
	var express = require('express');
	var app = express();
	var auth = require("./AuthConfig");

	var classDef = function () {};
    
    classDef.prototype.App = app;
    classDef.prototype.Auth = auth;
    classDef.prototype.Express = express;
    classDef.prototype.ResponseProcessor = (request, response, logicPromise) => {
        var logicDefCode = Attollo.App.Name + '/' + request.method + request.path;

		response.setHeader('Content-Type', 'application/json');

        var errorHandler = (err) => {
            response.status(500).json({
                error: true,
                data: {
                    message: err.message,
                    stack: err.stack
                }
            });
        };

        Attollo.Services.Plugin.GetPluginDefPreLogics(
            request.AuthContext,
            logicDefCode
        ).then((prePromises) => {
            Promise.all(prePromises)
            .then(() => {
                logicPromise
                .then((result) => {
                    Attollo.Services.Plugin.GetPluginDefPostLogics(
                        request.AuthContext,
                        logicDefCode,
                        result
                    )
                    .then((returnValue) => {
                        response.json({
                            error: false,
                            data: result != null ?
                                (
                                    (typeof returnValue.toJSON === 'function') ?
                                        returnValue.toJSON() :
                                        returnValue
                                ) :
                                null
                        });
                    }).catch(errorHandler);
                }).catch(errorHandler);
            }).catch(errorHandler);
        }).catch(errorHandler);
    };

	module.exports = new classDef();
})();
