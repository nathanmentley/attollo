import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class CssRuleDefController extends BaseController {
    static get UrlEndpoint() { return '/CssRuleDefs'; }

    static GetLogic(request, response) {
        return Attollo.Services.Css.GetCssRuleDefs(request.AuthContext);
    }
};