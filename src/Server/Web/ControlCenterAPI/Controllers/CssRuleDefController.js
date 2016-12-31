import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class CssRuleDefController extends BaseController {
    static get UrlEndpoint() { return '/CssRuleDefs'; }

    static GetLogic(request, response) {
        return attollo.Services.Css.GetCssRuleDefs(request.AuthContext);
    }
};