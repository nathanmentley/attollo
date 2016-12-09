import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class PageController extends BaseController {
    static get UrlEndpoint() { return '/Pages'; }

    static GetLogic(request, response) {
        return Attollo.Services.Page.GetPages(request.AuthContext, request.query.siteVersionId);
    }
    static PostLogic(request, response) {
        return Attollo.Services.Page.AddPage(request.AuthContext, request.body.page);
    }
    static PutLogic(request, response) {
        return Attollo.Services.Page.UpdatePage(request.AuthContext, request.body.page);
    }
    static DeleteLogic(request, response) {
        return Attollo.Services.Page.DeletePage(request.AuthContext, { id: request.query.pageId });
    }
};