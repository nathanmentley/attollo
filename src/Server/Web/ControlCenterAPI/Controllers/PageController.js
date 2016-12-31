import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class PageController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Pages'; }

    GetLogic(request, response) {
        return this._attollo.Services.Page.GetPages(request.AuthContext, request.query.siteVersionId);
    }
    PostLogic(request, response) {
        return this._attollo.Services.Page.AddPage(request.AuthContext, request.body.page);
    }
    PutLogic(request, response) {
        return this._attollo.Services.Page.UpdatePage(request.AuthContext, request.body.page);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.Page.DeletePage(request.AuthContext, { id: request.query.pageId });
    }
};