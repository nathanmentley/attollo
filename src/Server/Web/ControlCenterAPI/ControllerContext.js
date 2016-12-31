import constitute from 'constitute';
import express from 'express';

import Attollo from "../../Common/Attollo";

import AuthConfig from "./AuthConfig";

var attollo = constitute(Attollo);
var app = express();

export default class ControllerContext {
    static get App() { return app; }
    static get Auth() { return AuthConfig; }
    static get Express() { return express; }
    
    static ResponseProcessor(request, response, logicPromise) {
        var logicDefCode = attollo.AppName + '/' + request.method + request.path;

		response.setHeader('Content-Type', 'application/json');

        var errorHandler = (err) => {
            response.status(500).json({
                error: true,
                data: {
                    message: err.message,
                    stack: err.stack,
                    err: err
                }
            });
        };

        attollo.Services.Plugin.GetPluginDefPreLogics(
            request.AuthContext,
            logicDefCode
        ).then((prePromises) => {
            Promise.all(prePromises)
            .then(() => {
                logicPromise
                .then((result) => {
                    attollo.Services.Plugin.GetPluginDefPostLogics(
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
