import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class PluginDefController extends BaseController {
    static get UrlEndpoint() { return '/PluginDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.Plugin.GetPluginDefs(request.AuthContext);
    }
};