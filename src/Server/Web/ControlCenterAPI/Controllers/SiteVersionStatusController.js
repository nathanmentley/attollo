import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class SiteVersionStatusController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/SiteVersionStatuses'; }

    GetLogic(request, response) {
        return this._attollo.Services.Site.GetSiteVersionStatuses(request.AuthContext);
    }
};