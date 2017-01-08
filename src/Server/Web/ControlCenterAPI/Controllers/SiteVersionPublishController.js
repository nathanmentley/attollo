import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class SiteVersionPublishController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/SiteVersions/Publish'; }

    PutLogic(request, response) {
        return this.Attollo.Services.Site.PublishSiteVersion(request.AuthContext, request.query.siteVersionId);
    }
};