import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class SiteVersionProvisionController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/SiteVersions/Provision'; }

    GetLogic(request, response) {
        return this._attollo.Services.Site.ExportSiteVersion(request.AuthContext, request.query.siteVersionId);
    }

    PostLogic(request, response) {
        return this._attollo.Services.Site.ImportSiteVersion(request.AuthContext, request.body.site, request.body.siteId);
    }

    PutLogic(request, response) {
        return this._attollo.Services.Site.CloneSiteVersion(request.AuthContext, request.query.siteVersionId, request.query.siteId);
    }
};