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
		return this._attollo.Services.Plugin.AddPluginDefLogic(
			request.AuthContext,
			request.body.logic
		);
	}

	PutLogic(request, response) {
		return this._attollo.Services.Plugin.UpdatePluginDefLogic(
			request.AuthContext,
			request.body.logic
		);
	}

	DeleteLogic(request, response) {
		return this._attollo.Services.Plugin.DeletePluginDefLogic(
			request.AuthContext,
			{ id: request.query.pluginDefLogicId }
		);
	}
};