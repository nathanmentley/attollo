import express from 'express';

import AuthConfig from "./AuthConfig";

var app = express();

export default class ControllerContext {
    static get App() { return app; }
    static get Auth() { return AuthConfig; }
    static get Express() { return express; }
    
    static ResponseProcessor(request, response, logicPromise) {
        var logicDefCode = Attollo.AppName + '/' + request.method + request.path;

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
                        result != null ? (
                            (typeof result.toJSON === 'function') ?
                                result.toJSON() :
                                result
                            ) :
                            null
                    )
                    .then((returnValue) => {
                        response.json({
                            error: false,
                            data: returnValue
                        });
                    }).catch(errorHandler);
                }).catch(errorHandler);
            }).catch(errorHandler);
        }).catch(errorHandler);
    };
}
