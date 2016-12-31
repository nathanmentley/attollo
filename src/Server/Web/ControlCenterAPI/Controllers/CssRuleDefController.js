import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class CssRuleDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/CssRuleDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.Css.GetCssRuleDefs(request.AuthContext);
    }
};