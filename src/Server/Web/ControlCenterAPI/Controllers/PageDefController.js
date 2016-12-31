import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class PageDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/PageDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.Page.GetPageDefs(request.AuthContext);
    }
};