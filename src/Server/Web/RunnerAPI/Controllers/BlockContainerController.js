import constitute from 'constitute';

import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockContainerController extends BaseController  {
	static get UrlEndpoint() { return '/BlockContainers'; }

    static GetLogic(request, response) {
		return attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId);
	}
}