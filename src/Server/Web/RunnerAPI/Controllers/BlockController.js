import constitute from 'constitute';

import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockController extends BaseController  {
	static get UrlEndpoint() { return '/Blocks'; }

    static GetLogic(request, response) {
		return attollo.Services.Block.GetBlocks(request.AuthContext, request.query.blockContainerId);
	}
}