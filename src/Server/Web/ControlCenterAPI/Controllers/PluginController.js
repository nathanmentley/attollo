import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class PluginController extends BaseController {
    static get UrlEndpoint() { return '/Plugins'; }

    static GetLogic(request, response) {
        return attollo.Services.Plugin.GetPlugins(request.AuthContext);
    }
    static PostLogic(request, response) {
        return attollo.Services.Plugin.AddPlugin(request.AuthContext, request.body.pluginDefCode);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.Plugin.DeletePlugin(request.AuthContext, { id: request.query.pluginId });
    }
};