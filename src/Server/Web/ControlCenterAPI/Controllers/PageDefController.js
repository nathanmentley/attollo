import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class PageDefController extends BaseController {
    static get UrlEndpoint() { return '/PageDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.Page.GetPageDefs(request.AuthContext);
    }
};