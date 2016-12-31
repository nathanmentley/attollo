import { Dependencies } from 'constitute';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class BlockDefController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/BlockDefs'; }

    GetLogic(request, response) {
        return this._attollo.Services.Block.GetBlockDefs(request.AuthContext, request.query.pageDefId);
    }
};