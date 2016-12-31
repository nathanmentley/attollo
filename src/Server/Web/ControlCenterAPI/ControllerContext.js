import { Dependencies } from 'constitute';
import express from 'express';

import Attollo from "../../Common/Attollo";

import AuthConfig from "./AuthConfig";

@Dependencies(
    Attollo,
    AuthConfig
)
export default class ControllerContext {
    get App() { return this._app; }
    get Auth() { return this._authConfig; }
    get Express() { return express; }

    constructor(attollo, authConfig) {
        this._attollo = attollo;
        this._authConfig = authConfig;

        this._app = express();
    }
    
    ResponseProcessor(request, response, logicPromise) {
        var logicDefCode = this._attollo.AppName + '/' + request.method + request.path;

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

        this._attollo.Services.Plugin.GetPluginDefPreLogics(
            request.AuthContext,
            logicDefCode
        ).then((prePromises) => {
            Promise.all(prePromises)
            .then(() => {
                logicPromise
                .then((result) => {
                    this._attollo.Services.Plugin.GetPluginDefPostLogics(
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
