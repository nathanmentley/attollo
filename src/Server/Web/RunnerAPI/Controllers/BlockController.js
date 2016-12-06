import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

export default class BlockController extends BaseController  {
	static get UrlEndpoint() { return '/Blocks'; }

    static GetLogic(request, response) {
		return Attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId);
	}
}