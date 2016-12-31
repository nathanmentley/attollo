import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class SiteVersionStatusController extends BaseController {
    static get UrlEndpoint() { return '/SiteVersionStatuses'; }

    static GetLogic(request, response) {
        return attollo.Services.Site.GetSiteVersionStatuses(request.AuthContext);
    }
};