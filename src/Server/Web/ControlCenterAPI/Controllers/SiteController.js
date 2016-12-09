import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class SiteController extends BaseController {
    static get UrlEndpoint() { return '/Sites'; }

    static GetLogic(request, response) {
        return Attollo.Services.Site.GetSites(request.AuthContext);
    }
    static PostLogic(request, response) {
        return Attollo.Services.Site.AddSite(request.AuthContext, request.body.themeCode);
    }
    static PutLogic(request, response) {
        return Attollo.Services.Site.UpdateSite(request.AuthContext, request.body.site);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.Site.DeleteSite(request.AuthContext, { id: request.query.siteId });
    }
};