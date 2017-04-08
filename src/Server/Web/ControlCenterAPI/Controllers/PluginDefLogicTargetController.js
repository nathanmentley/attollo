import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
	Attollo
)
export default class PluginDefLogicTargetController extends BaseController {
	constructor(attollo) {
		super(attollo);
	}

	get UrlEndpoint() { return '/PluginDefLogicTargets'; }

	GetLogic(request, response) {
		return this._attollo.Services.Plugin.GetPluginDefLogicTargets(request.AuthContext);
	}
};