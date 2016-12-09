import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class SiteVersionStatusController extends BaseController {
    static get UrlEndpoint() { return '/SiteVersionStatuses'; }

    static GetLogic(request, response) {
        return Attollo.Services.Site.GetSiteVersionStatuses(request.AuthContext);
    }
};