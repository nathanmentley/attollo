import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class ThemeCssRuleController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/ThemeCssRules'; }

    GetLogic(request, response) {
        return this._attollo.Services.Css.GetThemeCssRules(request.AuthContext, request.query.themeId);
    }
    PutLogic(request, response) {
        return this._attollo.Services.Css.UpdateThemeCssRules(request.AuthContext, request.body.rules);
    }
};