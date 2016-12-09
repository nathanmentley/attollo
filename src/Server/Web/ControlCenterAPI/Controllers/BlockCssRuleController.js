import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

export default class BlockCssRuleController extends BaseController {
    static get UrlEndpoint() { return '/BlockCssRules'; }

    static GetLogic(request, response) {
        return Attollo.Services.Css.GetBlockCssRules(request.AuthContext, request.query.blockId);
    }
    static PutLogic(request, response) {
        return Attollo.Services.Css.UpdateBlockCssRules(request.AuthContext, request.body.rules);
    }
};