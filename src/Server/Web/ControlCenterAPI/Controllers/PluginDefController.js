import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class PluginDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/PluginDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.Plugin.GetPluginDefs(request.AuthContext);
    }
};