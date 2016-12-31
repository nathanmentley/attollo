import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class PluginController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Plugins'; }

    GetLogic(request, response) {
        return this._attollo.Services.Plugin.GetPlugins(request.AuthContext);
    }
    PostLogic(request, response) {
        return this._attollo.Services.Plugin.AddPlugin(request.AuthContext, request.body.pluginDefCode);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.Plugin.DeletePlugin(request.AuthContext, { id: request.query.pluginId });
    }
};