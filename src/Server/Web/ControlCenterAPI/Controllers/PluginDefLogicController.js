import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class PluginDefLogicController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/PluginDefLogics'; }

    GetLogic(request, response) {
        return this._attollo.Services.Plugin.GetPluginDefLogics(
        	request.AuthContext,
	        request.query.pluginDefId
        );
    }

	PostLogic(request, response) {
	}
};