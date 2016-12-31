import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class SiteVersionController extends BaseController {
    static get UrlEndpoint() { return '/SiteVersions'; }

    static GetLogic(request, response) {
        return attollo.Services.Site.GetSiteVersions(request.AuthContext, request.query.siteId);
    }
};