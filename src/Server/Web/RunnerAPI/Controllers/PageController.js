import { Dependencies } from 'constitute';

import Attollo from "../../../Common/Attollo";
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class PageController extends BaseController  {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Pages'; }

	GetLogic(request, response) {
		return this._attollo.Services.Page.GetPages(request.AuthContext, request.AuthContext.SiteVersionID);
	}
}