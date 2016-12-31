import constitute from 'constitute';

import Attollo from "../../../Common/Attollo";

import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class PageController extends BaseController  {
	static get UrlEndpoint() { return '/Pages'; }

    static GetLogic(request, response) {
		return attollo.Services.Page.GetPages(request.AuthContext, request.AuthContext.SiteVersionID);
	}
}