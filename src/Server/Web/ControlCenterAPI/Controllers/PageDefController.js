import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class PageDefController extends BaseController {
    static get UrlEndpoint() { return '/PageDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.Page.GetPageDefs(request.AuthContext);
    }
};