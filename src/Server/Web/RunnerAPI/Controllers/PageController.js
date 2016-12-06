import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

export default class PageController extends BaseController  {
	static get UrlEndpoint() { return '/Pages'; }

    static GetLogic(request, response) {
		return Attollo.Services.Page.GetPages(request.AuthContext, request.AuthContext.SiteVersionID);
	}
}