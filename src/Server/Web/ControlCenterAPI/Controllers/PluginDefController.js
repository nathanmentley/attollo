import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class PluginDefController extends BaseController {
    static get UrlEndpoint() { return '/PluginDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.Plugin.GetPluginDefs(request.AuthContext);
    }
};