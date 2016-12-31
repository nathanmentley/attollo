import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class SiteController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Sites'; }

    GetLogic(request, response) {
        return this._attollo.Services.Site.GetSites(request.AuthContext);
    }
    PostLogic(request, response) {
        return this._attollo.Services.Site.AddSite(request.AuthContext, request.body.themeCode);
    }
    PutLogic(request, response) {
        return this._attollo.Services.Site.UpdateSite(request.AuthContext, request.body.site);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.Site.DeleteSite(request.AuthContext, { id: request.query.siteId });
    }
};