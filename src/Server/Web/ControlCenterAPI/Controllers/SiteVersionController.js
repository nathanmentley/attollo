import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class SiteVersionController extends BaseController {
    static get UrlEndpoint() { return '/SiteVersions'; }

    static GetLogic(request, response) {
        return Attollo.Services.Site.GetSiteVersions(request.AuthContext, request.query.siteId);
    }
};