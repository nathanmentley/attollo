import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
	Attollo
)
export default class PluginDefLogicDefController extends BaseController {
	constructor(attollo) {
		super(attollo);
	}

	get UrlEndpoint() { return '/PluginDefLogicDefs'; }

	GetLogic(request, response) {
		return this._attollo.Services.Plugin.GetPluginDefLogicDefs(request.AuthContext);
	}
};