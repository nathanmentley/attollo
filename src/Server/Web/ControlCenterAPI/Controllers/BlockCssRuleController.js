import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

var attollo = constitute(Attollo);

export default class BlockCssRuleController extends BaseController {
    static get UrlEndpoint() { return '/BlockCssRules'; }

    static GetLogic(request, response) {
        return attollo.Services.Css.GetBlockCssRules(request.AuthContext, request.query.blockId);
    }
    static PutLogic(request, response) {
        return attollo.Services.Css.UpdateBlockCssRules(request.AuthContext, request.body.rules);
    }
};