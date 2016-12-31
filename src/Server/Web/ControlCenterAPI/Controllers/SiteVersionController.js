import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class SiteVersionController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/SiteVersions'; }

    GetLogic(request, response) {
        return this._attollo.Services.Site.GetSiteVersions(request.AuthContext, request.query.siteId);
    }
};