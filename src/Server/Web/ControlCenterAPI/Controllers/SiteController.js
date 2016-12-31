import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class SiteController extends BaseController {
    static get UrlEndpoint() { return '/Sites'; }

    static GetLogic(request, response) {
        return attollo.Services.Site.GetSites(request.AuthContext);
    }
    static PostLogic(request, response) {
        return attollo.Services.Site.AddSite(request.AuthContext, request.body.themeCode);
    }
    static PutLogic(request, response) {
        return attollo.Services.Site.UpdateSite(request.AuthContext, request.body.site);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.Site.DeleteSite(request.AuthContext, { id: request.query.siteId });
    }
};