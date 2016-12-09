import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class PluginController extends BaseController {
    static get UrlEndpoint() { return '/Plugins'; }

    static GetLogic(request, response) {
        return Attollo.Services.Plugin.GetPlugins(request.AuthContext);
    }
    static PostLogic(request, response) {
        return Attollo.Services.Plugin.AddPlugin(request.AuthContext, request.body.pluginDefCode);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.Plugin.DeletePlugin(request.AuthContext, { id: request.query.pluginId });
    }
};