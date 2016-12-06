import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

export default class BlockContainerController extends BaseController  {
	static get UrlEndpoint() { return '/BlockContainers'; }

    static GetLogic(request, response) {
		return Attollo.Services.Block.GetBlockContainers(request.AuthContext, request.query.pageId);
	}
}