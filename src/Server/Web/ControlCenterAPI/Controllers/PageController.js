import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class PageController extends BaseController {
    static get UrlEndpoint() { return '/Pages'; }

    static GetLogic(request, response) {
        return attollo.Services.Page.GetPages(request.AuthContext, request.query.siteVersionId);
    }
    static PostLogic(request, response) {
        return attollo.Services.Page.AddPage(request.AuthContext, request.body.page);
    }
    static PutLogic(request, response) {
        return attollo.Services.Page.UpdatePage(request.AuthContext, request.body.page);
    }
    static DeleteLogic(request, response) {
        return attollo.Services.Page.DeletePage(request.AuthContext, { id: request.query.pageId });
    }
};