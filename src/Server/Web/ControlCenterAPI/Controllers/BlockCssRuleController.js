import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockCssRuleController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockCssRules'; }

    GetLogic(request, response) {
        return this._attollo.Services.Css.GetBlockCssRules(request.AuthContext, request.query.blockId);
    }
    PutLogic(request, response) {
        return this._attollo.Services.Css.UpdateBlockCssRules(request.AuthContext, request.body.rules);
    }
};